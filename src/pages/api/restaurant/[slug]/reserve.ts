import { NextApiRequest, NextApiResponse } from "next";
import { times } from "@/data"
import { PrismaClient } from "@prisma/client";
import { findAvailableTables } from "@/services/restaurant/findAvailableTables";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { slug, day, time, partySize } = req.query as {
            slug: string;
            day: string;
            time: string;
            partySize: string
        }

        const { bookerEmail,
            bookerPhone,
            bookerFirstName,
            bookerLastName,
            bookerOccasion,
            bookerRequest } = req.body

        //validate all fields.... (todo)

        //validate the parameters
        if (!day || !time || !partySize || parseInt(partySize) === 0) {
            return res.status(400).json({
                errorMessage: "Invalid data provided"
            })
        }

        // validate the slug
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                slug
            },
            select: {
                tables: true,
                open_time: true,
                close_time: true,
                id: true
            }
        })

        if (!restaurant) {
            return res.status(400).json({
                errorMessage: "Restaurant not found"
            })
        }

        //validate reservation time
        if (new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
            new Date(`${day}T${time}`) >= new Date(`${day}T${restaurant.close_time}`)) {
            return res.status(400).json({
                errorMessage: "Restaurant is not open at this time"
            })
        }

        const searchTimesWithTables = await findAvailableTables({ day, time, restaurant, res })

        if (!searchTimesWithTables) {
            return res.status(400).json({
                errorMessage: "Invalid data provided"
            })
        }

        //find the available table for the exact reservation time
        const searchTimeWithTables = searchTimesWithTables.find((t) => {
            return t.date.toISOString() === new Date(`${day}T${time}`).toISOString()
        })


        if (!searchTimeWithTables) {
            return res.status(400).json({
                errorMessage: "Tables are reserved by someone else before you reserve. Please try a different time."
            })
        }

        //// determine if a timeslot is avilable based on the available tables and the requested party size
        const availabilities = searchTimesWithTables.map(t => {
            const sumSeats = t.tables.reduce((sum, table) => {
                return sum + table.seats
            }, 0)
            return {
                time: t.time,
                available: sumSeats >= parseInt(partySize)
            }
        })

        const isTableAvailable = availabilities.filter(t => {
            if (t.time === time && t.available === true) {
                return true
            }
        })

        if (isTableAvailable.length === 0) {
            return res.status(400).json({
                errorMessage: "Tables are reserved by someone else before you reserve. Please try a different time."
            })
        }

        ///listout the table ids with their seating capacity (currently tables are with 2 and 4 seating capacity)
        const tablesCount: { 2: number[], 4: number[] } = { 2: [], 4: [] }

        searchTimeWithTables.tables.forEach(table => {
            if (table.seats === 2) {
                tablesCount[2].push(table.id)
            }
            else {
                tablesCount[4].push(table.id)
            }
        });


        /// find tables to book based on the requested party size without wasting seats. if party size is 6, book 1 table with 4 seats and 1 table with 2
        const tablesToBook: number[] = []
        let seatsRemaining = parseInt(partySize)

        while (seatsRemaining > 0) {
            if (seatsRemaining >= 3) {
                if (tablesCount[4].length) {
                    tablesToBook.push(tablesCount[4][0])
                    tablesCount[4].shift()
                    seatsRemaining -= 4
                }
                else {
                    tablesToBook.push(tablesCount[2][0])
                    tablesCount[2].shift()
                    seatsRemaining -= 2
                }
            } else {
                if (tablesCount[2].length) {
                    tablesToBook.push(tablesCount[2][0])
                    tablesCount[2].shift()
                    seatsRemaining -= 2
                }
                else {
                    tablesToBook.push(tablesCount[4][0])
                    tablesCount[4].shift()
                    seatsRemaining -= 4
                }
            }
        }

        const booking = await prisma.booking.create({
            data: {
                number_of_people: parseInt(partySize),
                booking_time: new Date(`${day}T${time}`),
                booker_email: bookerEmail,
                booker_phone: bookerPhone,
                booker_first_name: bookerFirstName,
                booker_last_name: bookerLastName,
                booker_occasion: bookerOccasion,
                booker_request: bookerRequest,
                restaurant_id: restaurant.id
            }
        })

        const bookingOnTableData = tablesToBook.map(tableId => {
            return {
                table_id: tableId,
                booking_id: booking.id
            }
        })

        await prisma.bookingsOnTables.createMany({
            data: bookingOnTableData
        })

        return res.status(200).json(
            { searchTimeWithTables, tablesToBook }
        )
    }
}