import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "../css/quiz.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jsonrepair } from "jsonrepair";

export default function Quiz() {
  const navigate = useNavigate();

  const generateQuiz = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const topic = formData.get("topic");
    const expertise = formData.get("expertise");
    const numberOfQuestions = formData.get("number");
    const styleOfQuestion = formData.get("style");
    const data = {
      topic,
      expertise,
      numberOfQuestions,
      styleOfQuestion,
    };
    axios
      .post("/api/createQuiz", data)
      .then((response) => {
        const data = response.data.results;
        console.log(response);
        const trimmedJSON = data.replace(/^Quiz:\s*/, "").trim();
        const repairedJSON = JSON.parse(jsonrepair(trimmedJSON));

        if (response.data != null)
          navigate("/questions", { state: repairedJSON });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="quiz-container">
      <form onSubmit={generateQuiz}>
        <h1>Quiz Generation Options</h1>
        <h6>Please choose your preferences to generate your personal quiz</h6>
        <label>Topic</label>
        <select className="browser-default" name="topic">
          <option value=""></option>
          <option value="golang">golang</option>
          <option value="aws">aws</option>
          <option value="javascript">javascript</option>
          <option value="CI/CD">CI/CD</option>
          <option value="home gardens">home gardens</option>
          <option value="coffee">coffee</option>
          <option value="finger foods">finger foods</option>
        </select>
        <label>Expertise</label>
        <select className="browser-default" name="expertise">
          <option value=""></option>
          <option value="novice">novice</option>
          <option value="intermediate">intermediate</option>
          <option value="expert">expert</option>
        </select>
        <label>Number of questions</label>
        <select className="browser-default" name="number">
          <option value=""></option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <label>Style of Questions</label>
        <select className="browser-default" name="style">
          <option value=""></option>
          <option value="master oogway">master oogway</option>
          <option value="1940's gangster">1940's gangster</option>
          <option value="like I'm an 8 year old">like I'm an 8 year old</option>
          <option value="normal">normal</option>
          <option value="jedi">jedi</option>
          <option value="captain jack sparrow">captain jack sparrow</option>
          <option value="matthew mcconaughey">matthew mcconaughey</option>
        </select>

        <button
          className="waves-effect waves-light btn"
          style={{ maxWidth: "fit-content" }}
          type="submit"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
