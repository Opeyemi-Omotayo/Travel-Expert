"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { times, sizes } from "../../../../data";
import useAvailabilities from "../../../../hooks/useAvailabilities";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { convertToDisplayTime, Time } from "../../../../utils/convertToDisplayTime";

const ReservationCard = ({
  openTime,
  slug
}: {
  openTime: string;
  slug: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();
  const [time, setTime] = useState(openTime);
  const [size, setSize] = useState("2");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);


  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      size,
    });
  };

 

  return (
    <div className="fixed w-[17%]  bg-white rounded p-3 shadow">
      <div className="pb-2 font-bold text-center border-b">
        <h4 className="text-lg mr-7">Make a Reservation</h4>
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="">Room reservation</label>
        <select
          name=""
          className="py-3 font-light border-b"
          id=""
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >        {sizes.map((size) => (
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
            className="w-24 py-3 font-light border-b text-reg"
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
       <button
          className="w-full h-16 px-4 font-bold text-white bg-red-600 rounded"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${size}`}
                  className="w-24 p-2 mb-3 mr-3 text-center text-white bg-red-600 rounded cursor-pointer"
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time.time as Time)}
                  </p>
                </Link>
              ) : (
                <p className="w-24 p-2 mb-3 mr-3 bg-gray-300 rounded"></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationCard;
