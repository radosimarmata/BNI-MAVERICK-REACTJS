import React from "react";
import { Link } from "react-router-dom";

export default function NavLink({ href, children, className }) {
  return (
    <Link className={className} to={href}>
      {children}
    </Link>
  );
}
