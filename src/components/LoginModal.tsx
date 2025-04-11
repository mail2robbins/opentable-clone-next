"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LoginModalInputs from "./LoginModalInputs";
import useAuth from "@/hooks/useAuth";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";
import { X, User, Lock, Mail, Phone, MapPin } from "lucide-react";

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
  borderRadius: "1.5rem",
  overflow: "hidden",
};

export default function LoginModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  const handleOpen = () => {
    setAuthState({ data: null, error: null, loading: false });
    setOpen(true);
  };
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 300);
  };
  
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
            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
        } transition-all duration-200 border p-1.5 px-4 rounded-full text-sm font-medium shadow-sm hover:shadow-md active:scale-95 flex items-center space-x-1`}
        onClick={handleOpen}
      >
        {isSignIn ? (
          <>
            <Lock className="h-4 w-4" />
            <span>Sign In</span>
          </>
        ) : (
          <>
            <User className="h-4 w-4" />
            <span>Sign Up</span>
          </>
        )}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <Box sx={style}>
          <div className={`relative transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-all duration-200 active:scale-95"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {renderContent("Welcome Back", "Create an Account")}
              </h2>
              <p className="mt-2 text-white/90 text-sm">
                {renderContent(
                  "Sign in to access your account",
                  "Join us to start booking restaurants"
                )}
              </p>
            </div>

            <div className="p-8">
              {error && (
                <Alert 
                  severity="error" 
                  className="mb-6 rounded-lg animate-fade-in"
                  sx={{
                    '& .MuiAlert-icon': {
                      color: 'rgb(220 38 38)',
                    },
                  }}
                >
                  {error}
                </Alert>
              )}
              
              <LoginModalInputs
                inputs={inputs}
                handleChangeInput={handleChangeInput}
                isSignIn={isSignIn}
              />
              
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-6 active:scale-95"
                disabled={disabled || loading}
                onClick={handleClick}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <>
                    {isSignIn ? (
                      <>
                        <Lock className="h-4 w-4" />
                        <span className="text-white">Sign In</span>
                      </>
                    ) : (
                      <>
                        <User className="h-4 w-4" />
                        <span className="text-white">Create Account</span>
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
