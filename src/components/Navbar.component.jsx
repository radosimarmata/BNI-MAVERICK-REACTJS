import React from "react";
import Case from "./Case.component";
import NavLink from "./NavLink.component";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-blue-600 py-2">
      <Case>
        <div className="flex items-center">
          <Link
            className="mr-2 text-sm font-semibold uppercase text-white"
            to="/"
          >
            BNI MAVERICK
          </Link>
        </div>
      </Case>
    </div>
  );
}
