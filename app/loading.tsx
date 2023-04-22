import React from "react";

const loading = () => {
  return (
    <main>
      <div className="flex flex-wrap justify-center py-3 mt-10 px-36">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
          <div
            key={num}
            className="w-64 overflow-hidden rounded cursor-pointer m-3animate-plus bg-slate-200 h-72"
          ></div>
        ))}
      </div>
    </main>
  );
};

export default loading;
