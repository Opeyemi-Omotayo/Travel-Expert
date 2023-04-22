"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { times, sizes } from "../../../../data";

const ReservationCard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="pb-2 font-bold text-center border-b">
        <h4 className="text-lg mr-7">Make a Reservation</h4>
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="">Room reservation</label>
        <select name="" className="py-3 font-light border-b" id="">
        {sizes.map((size) => (
            <option value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          {/* <input type="text" className="py-3 font-light border-b w-28" /> */}
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 font-light border-b text-reg w-24"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Check-in</label>
          <select name="" id="" className="py-3 font-light border-b">
            {times.map((time) => <option value={time.time}>{time.displayTime}</option>)}
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
