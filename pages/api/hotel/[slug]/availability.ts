import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { findAvailabileRooms } from "../../../../services/hotel/findAvailableRooms";

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

    const searchTimesWithRooms = await findAvailabileRooms({
      day,
      time,
      res,
      hotel,
    });

    if (!searchTimesWithRooms) {
      return res.status(400).json({
        errorMessage: "Invalid data provided",
      });
    }

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
    

    return res.json({availabilties});
  }
}

