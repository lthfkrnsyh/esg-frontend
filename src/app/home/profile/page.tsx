// pages/home.tsx
"use client";
import React, { useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  role: string;
  token: string;
  date_create: string;
  date_update: string | null;
}

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    // Mengambil data dari localStorage saat komponen pertama kali dimuat
    const data: any = localStorage.getItem("data");

    // Memastikan data tidak kosong sebelum di-parse
    if (data) {
      const userData = JSON.parse(data);
      const userDataObject: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone_number: userData.phone_number,
        address: userData.address,
        role: userData.role,
        token: userData.token,
        date_create: userData.date_create,
        date_update: userData.date_update,
      };
      setUser(userDataObject);
      console.log(userDataObject);
    }
  }, []);

  const getRoleText = (role: string) => {
    if (role === "1") {
      return "Root Access";
    } else if (role === "2") {
      return "Administrator";
    }
    return role;
  };

  return (
    <>
      <div className="w-full flex justify-center items-center rounded-3xl mt-8 mb-8">
        <div className="h-100 w-152 absolute flex justify-center items-center">
          <img
            className="object-cover h-56 w-56 rounded-full"
            src="https://www.svgrepo.com/download/382107/male-avatar-boy-face-man-user-6.svg"
            alt=""
          />
        </div>

        <div
          className="
          h-96
          mx-4
          w-4/5
          bg-darkGreen-200
           rounded-3xl
          shadow-md
          sm:w-3/5 sm:mx-0
        "
        >
          <div className="h-1/2 w-full flex justify-between items-baseline px-3 py-5">
            <h1 className="text-white">Profile</h1>
          </div>

          <div
            className="
            bg-white
            h-1/2
            w-full
            rounded-3xl
            flex flex-col
            justify-around
            items-center
          "
          >
            <div className="w-full h-1/2 flex justify-between items-center px-3 pt-2">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-gray-500 text-xs">Create</h1>
                <h1 className="text-gray-600 text-xs font-bold">
                  {user?.date_create.split(" ")[0]}
                </h1>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-gray-500 text-xs">Address</h1>
                <h1 className="text-gray-600 text-xs font-bold">
                  {user?.address}
                </h1>
              </div>
            </div>
            <div className="w-full h-1/2 flex flex-col justify-center items-center">
              <h1 className="text-gray-700 font-bold">{user?.name}</h1>
              <h1 className="text-gray-700 font-bold">{user ? getRoleText(user.role) : ""}</h1>
              <h1 className="text-gray-500 text-sm">{user?.email}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
