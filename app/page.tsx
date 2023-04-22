import Header from "./components/Header";
import HotelCard from "./components/HotelCard";
import { Facilities , Location, PRICE, PrismaClient, Review } from "@prisma/client";

const Prisma = new PrismaClient();

export interface HotelCardType {
  id: number;
  name: string;
  main_image: string;
  Facilities: Facilities;
  location: Location;
  slug: string,
  price: PRICE;
  review: Review[];
}

const fetchHotel = async (): Promise<HotelCardType[]> => {
  const hotels = await Prisma.hotel.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      Facilities: true,
      location: true,
      slug: true,
      price: true,
      review: true
    },
  });

  return hotels;
};

export default async function Home() {
  const hotels = await fetchHotel();

  console.log({ hotels });
  return (
    <main>
      <Header />
      <div className="flex flex-wrap justify-center py-3 mt-10 px-36">
        {hotels.map((hotel) => (
          <HotelCard hotel={hotel} key={hotel.id}/>
        ))}
      </div>
    </main>
  );
}
