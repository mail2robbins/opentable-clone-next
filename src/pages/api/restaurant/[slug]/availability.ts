import { findAvailableTables } from "@/services/restaurant/findAvailableTables";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { slug, day, time, partySize } = req.query as {
            slug: string;
            day: string;
            time: string;
            partySize: string
        }

        if (!day || !time || !partySize || parseInt(partySize) === 0) {
            return res.status(400).json({
                errorMessage: "Invalid data provided"
            })
        }


        //validate restaurant slug
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
                errorMessage: "Invalid data provided"
            })
        }


        const searchTimesWithTables = await findAvailableTables({ day, time, restaurant, res })

        if (!searchTimesWithTables) {
            return res.status(400).json({
                errorMessage: "Invalid data provided"
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

        //filter out times that are outside of the opening window
        const filteredAvailabilities = availabilities.filter(availability => {
            const timeIsAfterOpeningHour = new Date(`${day}T${availability.time}`) >= new Date(`${day}T${restaurant.open_time}`)
            const timeIsBeforeClosingHour = new Date(`${day}T${availability.time}`) < new Date(`${day}T${restaurant.close_time}`)

            return timeIsAfterOpeningHour && timeIsBeforeClosingHour
        })

        return res.status(200).json(
            filteredAvailabilities
        )
    }
}