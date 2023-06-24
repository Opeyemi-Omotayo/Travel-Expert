"use client";

import React from "react";
import errorImg from "../../public/icons/error.png";
import Image from "next/image";

const error = ({ error }: { error: Error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <Image src={errorImg} alt="error" className="w-56 mb-8" />
      <div className="bg-white rounded shadow px-9 py-14">
        <h3 className="text-3xl font-bold">Well, this is embarrassing</h3>
        <p className="font-bold text-reg">{error.message} </p>
        <p className="mt-6 text-sm font-light">Error Code : 400</p>
      </div>
    </div>
  );
};

export default error;
