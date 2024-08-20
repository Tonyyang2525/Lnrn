import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../css/home.css";
import logo from "../pages/image.png";
import bolt from "../pages/bolt-solid.svg";
import money from "../pages/money-bills-solid.svg";
import user from "../pages/user-solid.svg";

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleStartJourney = () => {
    navigate("/quiz"); // Navigate to the quiz page when the button is clicked
  };

  return (
    <div className="home-container">
      <img src={logo} alt="Centered" className="home-image" />
      <h2 className="home-text">
        Your guided path to programming enlightenment
      </h2>
      <button className="home-button" onClick={handleStartJourney}>
        Begin journey
      </button>
      <div className="home-features">
        <div className="feature">
          <img src={bolt} alt="bolt" className="icons" />
          <p className="heading-tag">Personalized Quizzes</p>
          <p className="feature-description">
            Greetings, young padawan. Are you ready to embark on a journey of
            personalized enlightenment through the art of coding? Our app, can
            create custom quizzes that align with your coding skills and
            interests. Whether you are a novice or a master, our system can
            generate questions that will test your proficiency in programming
            languages, tools, and concepts
          </p>
        </div>
        <div className="feature">
          <img src={money} alt="money" className="icons" />
          <p className="heading-tag">Rewarding</p>
          <p className="feature-description">
            Our app is designed to be both challenging and rewarding, so you can
            learn new concepts while enjoying the process. With our personalized
            quiz app, you can track your progress, compete with your peers, and
            discover new areas of expertise. The journey of a thousand lines of
            code begins with a single keystroke
          </p>
        </div>
        <div className="feature">
          <img src={user} alt="user" className="icons" />
          <p className="heading-tag">Personal SME</p>
          <p className="feature-description">
            Welcome to the path of knowledge. Our app is like having a personal
            subject matter expert at your side, guiding you on your journey
            towards wisdom
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
