import React from 'react';
import Link from 'next/link';
import { HotelCardType } from '../page';
import Price from './Price';
import Stars from './Stars';

interface Props {
  hotel : HotelCardType
}

const HotelCard = ({hotel}: Props) => {
  return (
    <div
          className="w-64 m-3 overflow-hidden border rounded cursor-pointer h-72 bg-white shadow-md transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-80 duration-300 "
          key={hotel.id}
        >
          <Link href={`hotel/${hotel.slug}`}>
          <img
            src={hotel.main_image}
            alt=""
            className="w-full h-36"
          />
          <div className="p-1">
            <h3 className="mb-2 text-lg font-bold">{hotel.name}</h3>
            <div className="flex items-start">
              <Stars review={hotel.review}/>
              <p className="ml-2">{hotel.review.length} review{hotel.review.length > 1? "s" : ""}</p>
            </div>
            <div className="flex font-light capitalize text-reg">
              <p className="mr-3 ">{hotel.Facilities.name}</p>
             <Price price={hotel.price}/>
              <p>{hotel.location.name}</p>
            </div>
          </div>
          </Link>
        </div>
  )
}

export default HotelCard
