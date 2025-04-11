import { ChangeEvent } from "react";
import { Mail, Lock, User, Phone, MapPin } from "lucide-react";

interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean;
}

export default function LoginModalInputs({
  inputs,
  handleChangeInput,
  isSignIn,
}: Props) {
  return (
    <div className="space-y-4">
      {isSignIn ? (
        <>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
            </div>
            <input
              type="email"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition-all duration-200 ease-in-out hover:bg-white hover:border-gray-300"
              placeholder="Email"
              value={inputs.email}
              onChange={handleChangeInput}
              name="email"
            />
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
            </div>
            <input
              type="password"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition-all duration-200 ease-in-out hover:bg-white hover:border-gray-300"
              placeholder="Password"
              value={inputs.password}
              onChange={handleChangeInput}
              name="password"
            />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition-all duration-200 ease-in-out hover:bg-white hover:border-gray-300"
                placeholder="First Name"
                value={inputs.firstName}
                onChange={handleChangeInput}
                name="firstName"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition-all duration-200 ease-in-out hover:bg-white hover:border-gray-300"
                placeholder="Last Name"
                value={inputs.lastName}
                onChange={handleChangeInput}
                name="lastName"
              />
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
            </div>
            <input
              type="email"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition-all duration-200 ease-in-out hover:bg-white hover:border-gray-300"
              placeholder="Email"
              value={inputs.email}
              onChange={handleChangeInput}
              name="email"
            />
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition-all duration-200 ease-in-out hover:bg-white hover:border-gray-300"
              placeholder="Phone"
              value={inputs.phone}
              onChange={handleChangeInput}
              name="phone"
            />
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition-all duration-200 ease-in-out hover:bg-white hover:border-gray-300"
              placeholder="City"
              value={inputs.city}
              onChange={handleChangeInput}
              name="city"
            />
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
            </div>
            <input
              type="password"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition-all duration-200 ease-in-out hover:bg-white hover:border-gray-300"
              placeholder="Password"
              value={inputs.password}
              onChange={handleChangeInput}
              name="password"
            />
          </div>
        </>
      )}
    </div>
  );
}
