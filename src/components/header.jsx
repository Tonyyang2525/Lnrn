import React from "react";
import { Link } from "react-router-dom";

export default function header() {
  return (
    <nav>
      <div class="nav-wrapper blue">
        <Link to="/"><h1>Lrnr</h1></Link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <Link to="/account"><li>Account</li></Link>
          <Link to="/quiz"><li>Quiz</li></Link>
        </ul>
      </div>
    </nav>
  );
}
