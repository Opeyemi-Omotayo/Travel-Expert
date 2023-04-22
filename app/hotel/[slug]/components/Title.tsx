import React from "react";

const Title = ({name}: {name: string}) => {
  return (
    <div className="pb-6 mt-4 border-b">
      <h1 className="text-6xl font-bold">{name}</h1>
    </div>
  );
};

export default Title;
