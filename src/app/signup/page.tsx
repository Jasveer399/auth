"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Signuppage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [isLoading, setisLoading] = useState(false);
  const [buttondisabled, setbuttondisabled] = useState(true);
  const router = useRouter();
  const OnSignup = async () => {
    try {
      setisLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log("User Logged In", res.data);
      if (res.data.status === 400) {
        alert(res.data.message);
        setisLoading(false);
        setUser({
          email: "",
          password: "",
          username: "",
        });
        return;
      }
      toast.success("User Logged In");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setbuttondisabled(false);
    } else {
      setbuttondisabled(true);
    }
  }, [user]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-80 h-[430px] bg-white rounded-lg flex flex-col ">
        <h1 className="text-center pt-3 text-3xl font-bold text-gray-800 dark:text-black shadow-lg shadow-gray-500">
          {isLoading ? "Processing" : "Sign up"}
        </h1>
        <div className="mt-5 flex flex-col">
          <label htmlFor="" className="text-black pl-4 text-lg font-medium">
            UserName
          </label>
          <input
            type="text"
            className="bg-black p-2 mx-3 rounded-xl shadow-lg shadow-gray-500"
            value={user.username}
            placeholder="Enter Username"
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
        </div>
        <div className="mt-5 flex flex-col">
          <label htmlFor="" className="text-black pl-4 text-lg font-medium">
            Email   
          </label>
          <input
            type="text"
            className="bg-black p-2 mx-3 rounded-xl shadow-lg shadow-gray-500"
            value={user.email}
            placeholder="Enter Email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </div>
        <div className="mt-5 flex flex-col">
          <label htmlFor="" className="text-black pl-4 text-lg font-medium">
            Password
          </label>
          <input
            type="text"
            className="bg-black p-2 mx-3 rounded-xl shadow-lg shadow-gray-500"
            value={user.password}
            placeholder="Enter Password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>
        <button
          className="mt-10 bg-black rounded-xl p-2 mx-10 shadow-lg shadow-gray-500"
          onClick={buttondisabled ? () => {} : OnSignup}
        >
          {buttondisabled ? "Loading" : "Sign up"}
        </button>
        <Link href={"/login"} className="text-black text-center mt-2 ">Visit Login Page</Link>
      </div>
    </div>
  );
}

export default Signuppage;
