import { PrismaClient, Room } from "@prisma/client";
import { NextApiResponse } from "next";
import { times } from "../../data";

const prisma = new PrismaClient();

export const findAvailabileRooms = async ({
  time,
  day,
  res,
  hotel,
}: {
  time: string;
  day: string;
  res: NextApiResponse;
  hotel: {
    rooms: Room[];
    open_time: string;
    close_time: string;
  };
}) => {
  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({
      errorMessage: "Invalid data provided - from available rooms",
    });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      rooms: true,
    },
  });

  const bookingRoomsObj: { [key: string]: { [key: number]: true } } = {};

  bookings.forEach((booking) => {
    bookingRoomsObj[booking.booking_time.toISOString()] =
      booking.rooms.reduce((obj, room) => {
        return {
          ...obj,
          [room.room_id]: true,
        };
      }, {});
  });

  const rooms = hotel.rooms;

  const searchTimesWithRooms = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      rooms,
    };
  });

  searchTimesWithRooms.forEach((t) => {
    t.rooms = t.rooms.filter((room) => {
      if (bookingRoomsObj[t.date.toISOString()]) {
        if (bookingRoomsObj[t.date.toISOString()][room.id]) return false;
      }
      return true;
    });
  });

  return searchTimesWithRooms;
};