import SideBar from "@/components/SideBar";
import React from "react";
import { Outlet } from "react-router-dom";

const Root: React.FC = () => {
  return (
    <div className="flex !font-poppins">
      <SideBar />
      <div className="w-full">
        <header className="p-2">
          <h1 className="text-3xl uppercase font-bold">Face Recognition</h1>
        </header>
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
