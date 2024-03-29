"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LoginModalInputs from "./LoginModalInputs";
import useAuth from "@/hooks/useAuth";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
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
        className={`${renderContent(
          "bg-blue-400 text-white",
          ""
        )} border p-1 px-4 rounded mr-3`}
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
            <div className="p-2 h-[600px]">
              {error ? (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              ) : null}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm">
                  {renderContent("Sign In", "Create Account")}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderContent(
                    "Log into your Account",
                    "Create your OpenTable Account"
                  )}
                </h2>
                <LoginModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignIn}
                />

                <button
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {renderContent("Sign In", "Create Account")}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
