"use client";

import Link from "next/link";
import LoginModal from "./LoginModal";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useContext } from "react";
import useAuth from "@/hooks/useAuth";
import { CircularProgress } from "@mui/material";

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
          <>
            {data?.firstName ? (
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
                <div className="relative z-0">
                  <div className="flex">
                    <LoginModal isSignIn={true} />
                    <LoginModal isSignIn={false} />
                  </div>
                  {loading ? (
                    <div className="absolute inset-0 flex z-10 bg-white justify-end pr-3">
                      <CircularProgress variant="indeterminate" disableShrink />
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
