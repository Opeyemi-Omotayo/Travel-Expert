import React from "react";
import Header from "./components/Header";
import HotelNavBar from "./components/HotelNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { Items, PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

interface Hotel {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  open_time: string;
  close_time: string;
  items: Items[];
  review: Review[]
}

const fetchHotelBySlug = async (slug: string): Promise<Hotel> => {
  const hotel = await prisma.hotel.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      review: true,
      open_time: true,
      close_time: true,
      items: true,
        },
  });

  if (!hotel) {
   notFound()
  }

  return hotel;
};

const HotelDetailsPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const hotel = await fetchHotelBySlug(params.slug);
  return (
    <React.Fragment>
      <Header name={hotel.name} />
      <div className="flex items-start justify-between w-2/3 m-auto 0 -mt-11">
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <HotelNavBar slug={hotel.slug} />
          <Title name={hotel.name} />
          <Rating review={hotel.review}/>
          <Description description={hotel.description} />
          <Images images={hotel.images} />
          <Reviews review={hotel.review}/>
        </div>
        <div className="w-[27%] relative text-reg">
          <ReservationCard  openTime={hotel.open_time}  slug={hotel.slug} closeTime={hotel.close_time} items={hotel.items}/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HotelDetailsPage;
