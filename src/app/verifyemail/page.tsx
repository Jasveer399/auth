"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function VerifyEmailpage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifiedEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.message);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifiedEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center">
        <h1>Verify Email Token</h1>
        <p className="bg-orange-600 rounded-md p-3 mt-2 font-semibold text-center">
          {token ? token : "No Token"}
        </p>
        <p className="text-white mt-3">{verified ? "Verifyed" : ""}</p>
        <p className="text-white mt-3">{error ? "Error" : ""}</p>
      </div>
    </div>
  );
}
