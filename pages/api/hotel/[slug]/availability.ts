import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";

const prisma =  new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { slug, day, time, sizes } = req.query as {
      slug: string;
      day: string;
      time: string;
      sizes: string;
    };

    if (!day || !time || !sizes) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }

    const searchTimes = times.find(t => {
        return t.time === time
    })?.searchTimes;

    if(!searchTimes){
        return res.status(400).json({
            errorMessage: "Invalid data provided",
          }); 
    }

    const bookings = await prisma.booking.findMany({
      where: {
        booking_time:{
          gte: new Date(`${day}T${searchTimes[0]}`),
          lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)
        }
      },
      select: {
        number_of_people:true,
        rooms: true,
        booking_time: true
      }
    })

    const bookingRoomsObj: {[key: string]: {[key: number] : true}} ={}

    bookings.forEach(booking => {
      bookingRoomsObj[booking.booking_time.toISOString()] = booking.rooms.reduce((obj, room) => {
        return {
          ...obj,
          [room.room_id]: true
        }
      })
    })

    const hotel = await prisma.hotel.findUnique({
      where: {
        slug,
      },
      select: {
        rooms: true,
        open_time: true,
        close_time: true,
      },
    });

    if (!hotel) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }

    const rooms = hotel.rooms;

    const searchTimesWithRooms = searchTimes.map(searchTime =>{
      return {
        date: new Date(`${day}T${searchTime}`),
        time: searchTime,
        rooms
      }
    });

    searchTimesWithRooms.forEach(t => {
      t.rooms = t.rooms.filter(room => {
        if(bookingRoomsObj[t.date.toISOString()]){
          if(bookingRoomsObj[t.date.toISOString()][room.id]) return false
        }
        return true
      })
    });

    const availabilties = searchTimesWithRooms.map(t => {
      const sumSeats = t.rooms.reduce((sum, room) => {
        return sum + room.bed;
      }, 0);

      return {
        time:t.time,
        available: sumSeats >= parseInt(sizes)
      }
    }).filter((availability) => {
        const timeIsAfterOpeningHour =
          new Date(`${day}T${availability.time}`) >=
          new Date(`${day}T${hotel.open_time}`);
        const timeIsBeforeClosingHour =
          new Date(`${day}T${availability.time}`) <=
          new Date(`${day}T${hotel.close_time}`);

        return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
      });
    

    return res.json({ searchTimes, bookings });
  }
}

