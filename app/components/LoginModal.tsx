"use client";

import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Input from "./Input";
import useAuth from "../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
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

export default function LoginModal({ isSignin }: { isSignin: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {signin, signup} = useAuth();
  const {loading, error, data} = useContext(AuthenticationContext);

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    if (isSignin) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.password &&
        inputs.city &&
        inputs.phone
      ) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [inputs]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };


  const handleClick = (e: any) => {
    e.preventDefault();
    

    if (isSignin) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signup(inputs,  handleClose);
    }
    
  };


  return (
    <div>
      <button
        className={`${
          isSignin ? "text-white bg-blue-400" : ""
        } p-1 px-4 mr-3  border rounded `}
        onClick={handleOpen}
      >
        {isSignin ? "Sign In" : "Sign Up"}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {loading ? (
            <div className="py-24 px-2 h-[600px] flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[600px]">
              {error ? (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              ) : null}
            <div className="pb-2 mb-2 font-bold text-center uppercase border-b">
              <p className="text-sm">
                {isSignin ? "Sign In" : "Create Account"}
              </p>
            </div>
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                {isSignin ? "Log into your account" : "Create your account"}
              </h2>
            </div>
            <Input inputs={inputs} handleChangeInput={handleChangeInput} isSignin={isSignin} />
            <button className="w-full p-3 mb-5 text-sm text-white uppercase bg-red-600 rounded disabled:bg-gray-400" disabled={disabled} onClick={handleClick}>
              {" "}
              {isSignin ? "Sign In" : "Sign Up"}
            </button>
          </div>)}
        </Box>
      </Modal>
    </div>
  );
}
