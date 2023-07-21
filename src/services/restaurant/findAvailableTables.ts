import { times } from "@/data"
import { PrismaClient, Table } from "@prisma/client";
import { NextApiResponse } from "next";

const prisma = new PrismaClient()


export const findAvailableTables = async ({ day, time, restaurant, res }: {
    day: string;
    time: string;
    restaurant: {
        tables: Table[];
        open_time: string;
        close_time: string;
    }
    res: NextApiResponse
}) => {


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
        }, bookingTablesObj[booking.booking_time.toISOString()])
    })

    // //another way of doing the above section
    // bookings.forEach((booking) => {
    //     const bookingTimeKey = booking.booking_time.toISOString();
    //     if (!bookingTablesObj.hasOwnProperty(bookingTimeKey)) {
    //         bookingTablesObj[bookingTimeKey] = {};
    //     }
    //     booking.tables.forEach((table) => {
    //         bookingTablesObj[bookingTimeKey][table.table_id] = true;
    //     });
    // });

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

    return searchTimesWithTables
}