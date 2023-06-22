"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { times, sizes } from "../../../../data";
import useAvailabilities from "../../../../hooks/useAvailabilities";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { Time } from "../../../../utils/convertToDisplayTime";
import { Items } from "@prisma/client";


export default function ReservationCard({
  openTime,
  closeTime,
  slug,
  items,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
  items: Items[];
}) {
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedFDate, setSelectedFDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [size, setSize] = useState("2");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const [futuredDay, setFutureDay] = useState(new Date().toISOString().split("T")[0]);


  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const handleChangeFutureDate = (date: Date | null) => {
    if (date) {
      setFutureDay(date.toISOString().split("T")[0]);
      return setSelectedFDate(date);
    }
    return setSelectedFDate(null);
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      size,
    });
  };

 

  // const checkOut = new Date().setDate(new Date().getDate() + 1);

  return (
    <div className=" w-[97%] bg-white rounded p-3 shadow">
      <div className="pb-2 font-bold text-center border-b">
        <h4 className="text-lg mr-7">Make a Reservation</h4>
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="">Size</label>
        <select
          name=""
          className="py-3 font-light border-b"
          id=""
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          {sizes.map((size) => (
            <option value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Check-in</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            minDate={new Date()}
            className="w-24 py-3 font-light borber-b text-reg"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Check-out</label>
          <DatePicker
            selected={selectedFDate}
            onChange={handleChangeFutureDate}
            minDate={new Date()}
            className="w-24 py-3 font-light borber-b text-reg"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        </div>
         <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 font-light border-b" value={time} onChange={(e) => setTime(e.target.value)}>
            {times.map((time) => <option value={time.time}>{time.displayTime}</option>)}
          </select>
      </div>
      <div className="mt-5">
        <button
          className="w-full h-16 px-4 font-bold text-white bg-red-600 rounded"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" /> : "Find a Room"}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a room</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <>
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&size=${size}`}
                  className="w-20 p-2 mb-3 mr-3 text-center text-white bg-red-600 rounded cursor-pointer"
                >
                
               <p className="text-sm font-bold">
            Exclusive Room
             </p> 
                </Link>
                 <Link 
                 href={`/reserve/${slug}?date=${day}T${time.time}&size=${size}`}
                 className="w-20 p-2 mb-3 mr-3 text-center text-white bg-red-600 rounded cursor-pointer"
               >
               
              <p className="text-sm font-bold">
             Deluxe Room
            </p> 
               </Link>
               </> ) : (
                <p className="w-24 p-2 mb-3 mr-3 bg-gray-300 rounded"></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
