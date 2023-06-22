"use client";

import { CircularProgress } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import useReservation from "../../../../hooks/useReservation";
import { AuthenticationContext } from "../../../context/AuthContext";

export default function Form({
  slug,
  date,
  size,
}: {
  slug: string;
  date: string;
  size: string;
}) {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const [day, time] = date.split("T");
  const [disabled, setDisabled] = useState(true);
  const [didBook, setDidBook] = useState(false);
  const { error, loading, createReservation } = useReservation();
  const { data } = useContext(AuthenticationContext);


  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerEmail &&
      inputs.bookerPhone
    ) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [inputs]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      size,
      time,
      day,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerPhone: inputs.bookerPhone,
      bookerRequest: inputs.bookerRequest,
      setDidBook,
    });
  };

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <div className="text-center">
          <h1>You are all booked up</h1>
          <p>Enjoy your reservation</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            value={inputs.bookerFirstName || data?.firstName}
            name="bookerFirstName"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            value={inputs.bookerLastName || data?.lastName}
            placeholder="Last name"
            name="bookerLastName"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            value={inputs.bookerPhone || data?.phone}
            placeholder="Phone number"
            name="bookerPhone"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            value={inputs.bookerEmail || data?.email}
            placeholder="Email"
            name="bookerEmail"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            value={inputs.bookerRequest}
            name="bookerRequest"
            onChange={handleChangeInput}
          />
         
        {data?  (<button
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
            </button>) :  <button
           disabled={disabled || loading}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>}
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the Travel Expert Terms
            of Use and Privacy Policy. 
          </p>
        </>
      )}
    </div>
  );
}