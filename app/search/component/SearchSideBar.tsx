import {Facilities, Location, PRICE } from "@prisma/client";
import Link from "next/link";
import React, { useCallback } from "react";


const SearchSideBar = ({
  locations,
  Facilities,
  searchParams,
}: {
  locations: Location[];
  Facilities: Facilities[];
  searchParams: { city?: string, Facilities?: string  , price?: PRICE };
}) => {
  
  return (
    <div className="w-1/5">
      <div className="flex flex-col pb-4 border-b">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <Link href={{
            pathname:"/search",
            query : {
              ...searchParams,
              city: location.name
            }
          }} className="font-light capitalize text-reg" key={location.id}>
            {location.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col pb-4 mt-3 border-b">
        <h1 className="mb-2">Facilities</h1>
        {Facilities.map((Facilities) => (
          <Link href={{
            pathname:"/search",
            query : {
              ...searchParams,
              Facilities : Facilities.name
            }
          }}  className="font-light capitalize text-reg" key={Facilities.id}>
            {Facilities.name}
          </Link>
        ))}
      </div>
      <div className="pb-4 mt-3">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link href={{
            pathname:"/search",
            query : {
              ...searchParams,
              price : PRICE.CHEAP
            }
          }} className="w-full p-2 font-light border rounded-l text-reg">
            $
          </Link>
          <Link href={{
            pathname:"/search",
            query : {
              ...searchParams,
              price: PRICE.REGULAR
            }
          }} className="w-full p-2 font-light border-t border-b border-r text-reg">
            $$
          </Link>
          <Link href={{
            pathname:"/search",
            query : {
              ...searchParams,
              price: PRICE.EXPENSIVE
            }
          }} className="w-full p-2 font-light border-t border-b border-r rounded-r text-reg">
            $$$
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
