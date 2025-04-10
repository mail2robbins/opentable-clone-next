"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LoginModalInputs from "./LoginModalInputs";
import useAuth from "@/hooks/useAuth";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";
import { X } from "lucide-react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  borderRadius: "0.75rem",
  overflow: "hidden",
};

export default function LoginModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setAuthState({ data: null, error: null, loading: false });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth();
  const { data, loading, error, setAuthState } = useContext(
    AuthenticationContext
  );

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isSignIn) {
      if (inputs.email && inputs.password) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.email &&
        inputs.password &&
        inputs.firstName &&
        inputs.lastName &&
        inputs.city &&
        inputs.phone
      ) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [inputs]);

  const handleClick = () => {
    if (isSignIn) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signup(inputs, handleClose);
    }
  };

  const renderContent = (signInContent: string, signUpContent: string) => {
    return isSignIn ? signInContent : signUpContent;
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  
  return (
    <div>
      <button
        className={`${
          isSignIn 
            ? "bg-red-600 hover:bg-red-700 text-white" 
            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        } transition-colors duration-200 border p-1 px-4 rounded-md text-sm font-medium shadow-sm`}
        onClick={handleOpen}
      >
        {renderContent("Sign In", "Sign Up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="text-black"
      >
        <Box sx={style}>
          {loading ? (
            <div className="py-24 px-2 h-[600px] flex justify-center">
              <CircularProgress variant="indeterminate" disableShrink />
            </div>
          ) : (
            <div className="h-[600px] flex flex-col">
              {/* Header with close button */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">
                  {renderContent("Sign In", "Create Account")}
                </h2>
                <button 
                  onClick={handleClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto">
                {error ? (
                  <Alert severity="error" className="mb-4">
                    {error}
                  </Alert>
                ) : null}
                
                <div className="mb-6">
                  <h3 className="text-lg font-light text-center text-gray-600">
                    {renderContent(
                      "Log into your Account",
                      "Create your OpenTable Account"
                    )}
                  </h3>
                </div>
                
                <LoginModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignIn}
                />

                <div className="mt-6 space-y-3">
                  <button
                    className="uppercase bg-red-600 w-full text-white p-3 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-sm"
                    disabled={disabled}
                    onClick={handleClick}
                  >
                    {renderContent("Sign In", "Create Account")}
                  </button>
                  
                  <button
                    className="w-full p-3 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
