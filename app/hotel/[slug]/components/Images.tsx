import React from "react";

const Images = ({ images }: { images: string[] }) => {
  return (
    <div>
      <h1 className="pb-5 mt-10 text-3xl font-bold border-b mb-7">{images.length} photo{images.length > 1 ? "s" : ""}</h1>
      <div className="flex flex-wrap">
        {images.map((image) => (
          <img className="w-56 mb-1 mr-1 h-44" src={image} alt="" />
        ))}
      </div>
    </div>
  );
};

export default Images;
