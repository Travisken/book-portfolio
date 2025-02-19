"use client";

import { usePathname } from "next/navigation";
import { FiHome, FiLogOut, FiPlus } from "react-icons/fi";
import Link from "next/link";
import clsx from "clsx";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: FiHome },
  // { name: "Emails", href: "#emails", icon: FiMail },
  // { name: "Testimonials", href: "#testimonials", icon: FiStar },
  // { name: "Partners", href: "#partners", icon: FiUsers },
  { name: "Add Book", href: "dashboard/add-book", icon: FiPlus },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 h-screen py-6 bg-white shadow-md p-4 flex flex-col justify-between">
      <nav>
        <ul className="space-y-4 pt-16">
          {menuItems.map(({ name, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  "flex items-center p-3 rounded-lg transition-all duration-300",
                  pathname == href
                    ? "bg-[#3ca0ce] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200",
                )}
              >
                <Icon className="text-xl mr-2" />
                <span className="">{name}</span>
              </Link>
            </li>
          ))}
{/* 
          <button className="flex gap-2 items-center p-3 w-full rounded-lg transition-all duration-300 hover:shadow-md text-gray-700 hover:bg-gray-200">
            <FiPlus className="text-xl"/>
            
            Add book
          </button> */}
        </ul>
      </nav>

      {/* Logout Button */}
      <button className="flex items-center p-3 text-red-500 hover:text-red-600">
        <FiLogOut className="text-xl md:mr-2" />
        <span className="">Logout</span>
      </button>
    </aside>
  );
}
