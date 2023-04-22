import { Facilities, Location, PRICE, Review} from "@prisma/client";
import Link from "next/link";
import React from "react";
import Price from "../../components/Price";
import CalculateReviewRatingAverage from "../../../utils/CalculateReviewRatingAverage";
import Stars from "../../components/Stars";

interface Hotel {
  id: number;
  location: Location;
  name: string;
  main_image: string;
  price: PRICE;
  Facilities: Facilities;
  slug: string;
  review: Review[];
}

const HotelCard = ({hotel}: {hotel: Hotel}) => {

  const renderRatingText = () => {
    const rating = CalculateReviewRatingAverage(hotel.review);

    if(rating > 4){
      return "Awesome"
    }else if (rating <= 4 && rating > 3){
      return "Good"
    }else if(rating <=3 && rating > 0){
      return "Average"
    }else ""
  }

  return (
    <div className="flex pb-5 ml-4 border-b">
      <img
        src={hotel.main_image}
        alt=""
        className="rounded w-44 h-34"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{hotel.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2"><Stars review={hotel.review}/></div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="flex font-light text-reg">
           <Price price={hotel.price}/>
            <p className="mr-4 capitalize">{hotel.Facilities.name}</p>
            <p className="mr-4 capitalize">{hotel.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/hotel/${hotel.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
