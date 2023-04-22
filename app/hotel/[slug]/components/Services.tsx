import React from "react";
import ServicesCard from "./ServicesCard";
import { Items } from "@prisma/client";

const Services = ({ items }: { items: Items[] }) => {
  return (
    <main className="mt-5 bg-white">
      <div>
        <div className="pb-1 mt-4 mb-1">
          <h1 className="text-4xl font-bold">Services</h1>
        </div>
        {items.length ? (
          <div className="flex flex-wrap justify-between">
            {items.map((item) => (
              <ServicesCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            <p>This hotel doesn't have any services</p>{" "}
          </div>
        )}
      </div>
    </main>
  );
};

export default Services;
