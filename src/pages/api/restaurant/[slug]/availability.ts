import { NextApiRequest, NextApiResponse } from "next";
import { times } from "@/data"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug, day, time, partySize } = req.query as {
        slug: string;
        day: string;
        time: string;
        partySize: string
    }

    if (!day || !time || !partySize) {
        return res.status(400).json({
            errorMessage: "Invalid data provided"
        })
    }

    ////determine the search times of a choosen time (+/- 2 hrs)
    const searchTimes = times.find(t => {
        return t.time === time
    })?.searchTimes

    if (!searchTimes) {
        return res.status(400).json({
            errorMessage: "Invalid data provided"
        })
    }

    ////fetching the bookings
    const bookings = await prisma.booking.findMany({
        where: {
            booking_time: {
                gte: new Date(`${day}T${searchTimes[0]}`),
                lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)
            }
        },
        select:
        {
            number_of_people: true,
            booking_time: true,
            tables: true
        }
    })


    //compress/convert the booking details to an object with key as the date-time and value as the tables booked for that time
    const bookingTablesObj: { [key: string]: { [key: number]: true } } = {}
    bookings.forEach(booking => {
        bookingTablesObj[booking.booking_time.toISOString()] = booking.tables.reduce((obj, table) => {
            return { ...obj, [table.table_id]: true }
        }, {})
    })

    //get all tables of the restaurant
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            tables: true,
            open_time: true,
            close_time: true
        }
    })

    if (!restaurant) {
        return res.status(400).json({
            errorMessage: "Invalid data provided"
        })
    }

    const tables = restaurant.tables;

    //reformat the searTimes to include the date, time and tables
    const searchTimesWithTables = searchTimes.map(searchTime => {
        return {
            date: new Date(`${day}T${searchTime}`),
            time: searchTime,
            tables
        }
    })

    ///filter out the tables that are already booked
    searchTimesWithTables.forEach(t => {
        t.tables = t.tables.filter(table => {
            if (bookingTablesObj[t.date.toISOString()]) {
                if (bookingTablesObj[t.date.toISOString()][table.id]) return false
            }
            return true
        })
    })

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

    return res.status(200).json({
        filteredAvailabilities
    })
}