import React from "react";
import Header from "./component/Header";
import SearchSideBar from "./component/SearchSideBar";
import HotelCard from "./component/HotelCard";
import { PRICE, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

interface SearchParams {
  city?: string;
  Facilities?: string;
  price?: PRICE;
}

const fetchHotelByCity = (searchParams : SearchParams) => {
  const where: any = {};

  if(searchParams.city){
    const location = {
      name :{
        equals : searchParams.city.toLowerCase(),
      }
    }
    where.location = location;
  }

  if(searchParams.Facilities){
    const Facilities = {
      name :{
        equals : searchParams.Facilities.toLowerCase(),
      }
    }
    where.Facilities = Facilities;
  }

  if(searchParams.price){
    const price = {
        equals : searchParams.price,
    }
    where.price = price;
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    Facilities: true,
    location: true,
    slug: true,
    review: true
  };


  return prisma.hotel.findMany({
    where,
    select,
  });
};

const fetchLocations = async () => {
  return prisma.location.findMany();
};

const fetchFacilities = async () => {
  return prisma.facilities.findMany();
};

const SearchPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const hotel = await fetchHotelByCity(searchParams);
  const location = await fetchLocations();
  const Facilities = await fetchFacilities();
  return (
    <React.Fragment>
      <Header />
      <div className="flex items-start justify-between w-2/3 py-4 m-auto">
        <SearchSideBar
          locations={location}
         Facilities={Facilities}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {hotel.length ? (
            <>
              
              {hotel.map((hotel) => (
                <HotelCard hotel={hotel} key={hotel.id} />
              ))}{" "}
              
            </>
          ) : (
            <p>Sorry, No hotel found!</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchPage;
