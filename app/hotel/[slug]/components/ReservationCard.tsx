"use client";

import React from "react";

const ReservationCard = () => {
  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="pb-2 font-bold text-center border-b">
        <h4 className="text-lg mr-7">Make a Reservation</h4>
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="">Room reservation</label>
        <select name="" className="py-3 font-light border-b" id="">
          <option value="">1 person</option>
          <option value="">2 people</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <input type="text" className="py-3 font-light border-b w-28" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Check-in Time</label>
          <select name="" id="" className="py-3 font-light border-b">
            <option value="">7:30 AM</option>
            <option value="">9:30 AM</option>
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="w-full h-16 px-4 font-bold text-white bg-red-600 rounded">
          Find a Time
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;
