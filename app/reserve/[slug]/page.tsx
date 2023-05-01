import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Form from "./components/Form";
import Header from "./components/Header";

const prisma = new PrismaClient();

const fetchHotelBySlug = async (slug: string) => {
  const hotel = await prisma.hotel.findUnique({
    where: {
      slug,
    },
  });

  if (!hotel) {
    notFound();
  }

  return hotel;
};

export default async function Reserve({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; size: string };
}) {
  const hotel = await fetchHotelBySlug(params.slug);
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header
          image={hotel.main_image}
          name={hotel.name}
          date={searchParams.date}
          size={searchParams.size}
        />
        <Form
          size={searchParams.size}
          slug={params.slug}
          date={searchParams.date}
        />
      </div>
    </div>
  );
}