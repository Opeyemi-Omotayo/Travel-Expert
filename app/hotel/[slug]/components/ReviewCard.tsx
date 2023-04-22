import { Review } from '@prisma/client'
import React from 'react'
import Stars from '../../../components/Stars'

const ReviewCard = ({review}: {review: Review}) => {
  return (
    <div className="border-b pb-7 mb-7">
          <div className="flex">
            <div className="flex flex-col items-center w-1/6">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-400 rounded-full">
                <h2 className="text-2xl text-white uppercase">{review.first_name[0]}{review.last_name[0]}</h2>
              </div>
              <p className="text-center">{review.first_name} {review.last_name}</p>
            </div>
            <div className="w-5/6 ml-10">
              <div className="flex items-center">
                <div className="flex mr-5"><Stars rating={review.rating} review={[]}/></div>
              </div>
              <div className="mt-5">
                <p className="text-lg font-light">
                 {review.text}
                </p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ReviewCard
