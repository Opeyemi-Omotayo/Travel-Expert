import React from "react";

const Header = ({name}: {name: string}) => {
  return (
    <div className="overflow-hidden h-60">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-center text-white text-7xl captitalize text-shadow">
          {name}
        </h1>
      </div>
    </div>
  );
};

export default Header;
