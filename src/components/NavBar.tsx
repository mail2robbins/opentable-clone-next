"use client";

import Link from "next/link";
import LoginModal from "./LoginModal";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useContext, useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { CircularProgress } from "@mui/material";
import { Menu, X, User, LogOut, Search, MapPin } from "lucide-react";

const NavBar = () => {
  const { data, loading, error } = useContext(AuthenticationContext);
  const { signout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
            >
              <span className="font-bold text-gray-900 text-xl sm:text-2xl group-hover:text-red-600 transition-colors duration-200 tracking-tight">
                OpenTable
              </span>
            </Link>
          </div>

          {/* Search bar - hidden on mobile */}
          {/* <div className="hidden items-center flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition-all duration-200 ease-in-out hover:bg-white hover:border-gray-300"
                placeholder="Search restaurants..."
              />
            </div>
          </div> */}

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-all duration-200"
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
          <div className="hidden md:flex md:items-center md:space-x-4">
            {data?.firstName ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-900 group">
                  <div className="bg-gray-100 rounded-full p-1.5 group-hover:bg-gray-200 transition-colors duration-200">
                    <User className="h-5 w-5 text-gray-700" />
                  </div>
                  <span className="font-medium text-gray-900">{data.firstName}</span>
                </div>
                <button
                  className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                  onClick={() => signout()}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-white">Sign Out</span>
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
      <div 
        className={`${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
          {/* Mobile search */}
          {/* <div className="px-3 py-2">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition-all duration-200 ease-in-out hover:bg-white hover:border-gray-300"
                placeholder="Search restaurants..."
              />
            </div>
          </div> */}
          
          {data?.firstName ? (
            <div className="flex flex-col space-y-2 px-3 py-2">
              <div className="flex items-center space-x-2 text-gray-700 group">
                <div className="bg-gray-100 rounded-full p-1.5 group-hover:bg-gray-200 transition-colors duration-200">
                  <User className="h-5 w-full text-gray-600" />
                </div>
                <span className="font-medium">{data.firstName}</span>
              </div>
              <button
                className="flex items-center justify-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 w-full"
                onClick={() => signout()}
              >
                <LogOut className="h-4 w-full" />
                <span>Sign Out</span>
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
