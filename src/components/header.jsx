import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <div className="nav-wrapper blue">
        <Link to="/" className="brand-logo">
          Lrnr
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/quiz">Quiz Generation</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
