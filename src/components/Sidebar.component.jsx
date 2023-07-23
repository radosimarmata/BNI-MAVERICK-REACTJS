import React from "react";
import NavLink from "./NavLink.component";
import { Link, useLocation } from "react-router-dom";

const pathname = window.location.pathname;

const navigation = [
  { name: "Home", href: "/" },
  { name: "Data", href: "/data" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-4">
        <Link to="/">BNI MAVERICK</Link>
      </div>
      <ul>
        {navigation.map((item) => (
          <li className="mb-2" key={item.href}>
            <NavLink
              href={item.href}
              className={classNames(
                location.pathname === item.href
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "rounded-md px-3 py-2 text-sm font-medium",
              )}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
