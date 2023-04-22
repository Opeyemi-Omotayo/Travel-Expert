"use client"

import React, { useContext } from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout} = useAuth();
  return (
    <nav className="flex justify-between p-2 bg-white">
      <Link href="/" className="text-2xl font-bold text-gray-700">
        {" "}
        Travel-Expert{" "}
      </Link>
      <div>
        {loading ? null : (
          <div className="flex">
          {data ? (
            <button className="p-1 px-4 mr-3 text-white bg-blue-400 border rounded" onClick={signout}>SignOut</button>
          ) : (
            <>
              <LoginModal isSignin={true} />
              <LoginModal isSignin={false} />{" "}
            </>
          )}
        </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
