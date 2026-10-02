"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const navItems = [
    {
      name: "DashBoard",
      href: "/shop/dashboard",
    },
    {
      name: "Orders",
      href: "/shop/orders",
    },
    {
      name: "Products",
      href: "/shop/products",
    },
    {
      name: "Settings",
      href: "/shop/settings",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Shop Panel</h2>

      {navItems.map((item) => {
        return (
          <div key={item.href} className="flex flex-col h-full">
            <Link
              href={item.href}
              className={`mt-2 p-1 rounded-lg hover:bg-gray-800 border-1 border-gray-600 ${pathname === item.href ? "bg-gray-700" : ""}`}
            >
              {item.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
