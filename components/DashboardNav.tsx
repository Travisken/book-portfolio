"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "./Sidebar";

export default function DashboardNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      {/* <nav className="bg-white fixed w-full z-20 p-4 ">
        <div className="container mx-auto flex justify-between items-center">
          Hamburger Button
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>

          <h1 className="text-xl font-bold">Author Portfolio Admin</h1>
        </div>
      </nav> */}

      {/* Sidebar (Mobile) */}
      <div
        // className={` w-64 bg-white shadow-md transform ${
        //   isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        // } transition-transform duration-300 md:translate-x-0 md:w-64`}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Overlay (For closing sidebar on click outside) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
