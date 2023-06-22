import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { findAvailabileRooms } from "../../../../services/hotel/findAvailableRooms";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { slug, day, time, size } = req.query as {
      slug: string;
      day: string;
      time: string;
      size: string;
    };

    const {
      bookerEmail,
      bookerPhone,
      bookerFirstName,
      bookerLastName,
      bookerRequest,
    } = req.body;

    const hotel = await prisma.hotel.findUnique({
      where: {
        slug,
      },
      select: {
        rooms: true,
        open_time: true,
        close_time: true,
        id: true,
      },
    });

    if (!hotel) {
      return res.status(400).json({
        errorMessage: "Hotel not found",
      });
    }

    if (
      new Date(`${day}T${time}`) < new Date(`${day}T${hotel.open_time}`) ||
      new Date(`${day}T${time}`) > new Date(`${day}T${hotel.close_time}`)
    ) {
      return res.status(400).json({
        errorMessage: "Hotel is not open at that time",
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
        errorMessage: "Invalid data provided - from reserve",
      });
    }

    const searchTimeWithRooms = searchTimesWithRooms.find((t) => {
      return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
    });

    if (!searchTimeWithRooms) {
      return res.status(400).json({
        errorMessage: "No availablity, cannot book",
      });
    }

    const RoomsCount: {
      1: number[];
      2: number[];
    } = {
      1: [],
      2: [],
    };

    searchTimeWithRooms.rooms.forEach((room) => {
      if (room.bed === 1) {
        RoomsCount[1].push(room.id);
      } else {
        RoomsCount[2].push(room.id);
      }
    });

    const RoomsToBooks: number[] = [];
    let bedsRemaining = parseInt(size);

    while (bedsRemaining > 0) {
      if (bedsRemaining >= 2) {
        if (RoomsCount[2].length) {
          RoomsToBooks.push(RoomsCount[2][0]);
          RoomsCount[2].shift();
          bedsRemaining = bedsRemaining - 2;
        } else {
          RoomsToBooks.push(RoomsCount[1][0]);
          RoomsCount[1].shift();
          bedsRemaining = bedsRemaining - 1;
        }
      } else {
        if (RoomsCount[1].length) {
          RoomsToBooks.push(RoomsCount[1][0]);
          RoomsCount[1].shift();
          bedsRemaining = bedsRemaining - 1;
        } else {
          RoomsToBooks.push(RoomsCount[2][0]);
          RoomsCount[2].shift();
          bedsRemaining = bedsRemaining - 2;
        }
      }
    }

    const booking = await prisma.booking.create({
      data: {
        number_of_people: parseInt(size),
        booking_time: new Date(`${day}T${time}`),
        booker_email: bookerEmail,
        booker_phone: bookerPhone,
        booker_first_name: bookerFirstName,
        booker_last_name: bookerLastName,
        booker_request: bookerRequest,
        hotel_id: hotel.id,
      },
    });

    const bookingsOnRoomsData = RoomsToBooks.map((room_id) => {
      return {
        room_id,
        booking_id: booking.id,
      };
    });

    await prisma.bookingsOnRooms.createMany({
      data: bookingsOnRoomsData,
    });

    return res.json(booking);
  }
}

