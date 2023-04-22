import { Review } from "@prisma/client";
import React from "react";
import ReviewCard from "./ReviewCard";

const Reviews = ({review}: {review: Review[]}) => {
  return (
    <div>
      <h1 className="pb-5 mt-10 text-3xl font-bold mb-7 borber-b">
        What {review.length} {review.length === 1 ? "person": "people"} are saying
      </h1>
      <div>
        {/* REVIEW CARD */}
        {review.map((reviews) => <ReviewCard key={reviews.id} review={reviews}/>)}
        {/* REVIEW CARD */}
      </div>
    </div>
  );
};
export default Reviews;
