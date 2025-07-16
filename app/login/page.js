"use client";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";

export default function CustomLogin() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* 🔹 Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
        style={{ backgroundImage: "url('/cit-building.png')" }}
      ></div>

      {/* 🔹 Login Box */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center space-y-4">
          
          {/* 🔸 Logo on top */}
          <div className="flex justify-center">
            <Image
              src="/cit-logo.png"     // <- Replace with your actual image name
              alt="CIT Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>

          {/* 🔸 Heading */}
          <h1 className="text-2xl text-black font-bold mb-5">
            Welcome to Cambridge Institute of Technology 
          </h1>

          {/* 🔸 Login Button */}
          <LoginLink className="mt-7 bg-black text-white px-7 py-2 rounded hover:bg-gray-800 " >
            click here to sign in 
          </LoginLink>
        </div>
      </div>
    </div>
  );
}
