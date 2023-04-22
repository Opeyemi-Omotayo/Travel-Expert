import React from "react";
import Link from "next/link";

const HotelNavBar = ({slug}: {slug: string}) => {
  return (
    <nav className="flex pb-2 border-b text-reg">
      <Link href={`/hotel/${slug}`} className="mr-7">
        {" "}
        Overview{" "}
      </Link>
      <Link href={`/hotel/${slug}/services`} className="mr-7">
        {" "}
        Services{" "}
      </Link>
    </nav>
  );
};

export default HotelNavBar;
