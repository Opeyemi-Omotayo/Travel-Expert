import React from "react";
import Link from "next/link";
import NavBar from "../../../components/NavBar";
import Header from "../components/Header";
import HotelCard from "../../../components/HotelCard";
import HotelNavBar from "../components/HotelNavBar";
import Services from "../components/Services";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const fetchHotelServices =async (slug: string) => {
  const hotel = await prisma.hotel.findUnique({
    where: {
      slug
    },
    select: {
      items: true
    }
  });
  
  if(!hotel){
    throw new Error()
  }
  
  return hotel.items;
  
}


const HotelMenuPage = async ({params}: {params: {slug: string}}) => {
  const services = await fetchHotelServices(params.slug);
  return (
    <React.Fragment>
      <Header name={params.slug}/> {/* DESCRIPTION PORTION */}
      <div className="flex items-start justify-between w-2/3 m-auto 0 -mt-11">
        <div className="bg-white w-[100%] rounded p-3 shadow">
          <HotelNavBar slug={params.slug}/>
          <Services items={services}/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HotelMenuPage;
