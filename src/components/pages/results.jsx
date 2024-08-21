import React from "react";
import "../css/results.css";
import { Link } from "react-router-dom";
export default function results() {
  return (
    <div class="results-container">
      <h1 class="">lrnr</h1>
      <h2>Questions Right: 0111</h2>
      <Link to="/quiz">
        <button class="waves-effect waves-light btn">TRY ANOTHER QUIZ</button>
      </Link>
    </div>
  );
}
