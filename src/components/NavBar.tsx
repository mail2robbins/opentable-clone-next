"use client";

import Link from "next/link";
import LoginModal from "./LoginModal";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useContext, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { CircularProgress } from "@mui/material";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const { data, loading, error } = useContext(AuthenticationContext);
  const { signout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex items-center">
            <Link 
              href="" 
              className="flex items-center space-x-2 group"
            >
              <span className="font-bold text-gray-800 text-xl sm:text-2xl group-hover:text-red-600 transition-colors duration-200">
                OpenTable
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {data?.firstName ? (
              <div className="flex items-center space-x-4">
                <p className="text-gray-700">
                  Hello, <span className="font-medium">{data.firstName}</span>
                </p>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow"
                  onClick={() => signout()}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="flex space-x-4">
                  <LoginModal isSignIn={true} />
                  <LoginModal isSignIn={false} />
                </div>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-md">
                    <CircularProgress size={24} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
          {data?.firstName ? (
            <div className="flex flex-col space-y-2 px-3 py-2">
              <p className="text-gray-700">
                Hello, <span className="font-medium">{data.firstName}</span>
              </p>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 w-full"
                onClick={() => signout()}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="relative px-3 py-2">
              <div className="flex flex-col space-y-2">
                <LoginModal isSignIn={true} />
                <LoginModal isSignIn={false} />
              </div>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-md">
                  <CircularProgress size={24} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
