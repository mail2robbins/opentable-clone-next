"use client";

import Link from "next/link";
import LoginModal from "./LoginModal";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useContext } from "react";
import useAuth from "@/hooks/useAuth";

const NavBar = () => {
  const { data, loading, error } = useContext(AuthenticationContext);
  const { signout } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        <div className="flex">
          {loading ? null : data?.firstName ? (
            <>
              <p className="mt-1 mr-3">Hello {data.firstName}</p>
              <button
                className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
                onClick={() => signout()}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <LoginModal isSignIn={true} />
              <LoginModal isSignIn={false} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
