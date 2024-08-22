Lnrn
LrnR is a responsive web application that allows users to create customized quizzes, answer quiz questions, and view results. Originally developed using jQuery and GO, the application has been rewritten in Node.js and React to better align with modern development practices. The project integrates with the OpenAI API to generate and grade quizzes based on user inputs and utilizes Materialize CSS for styling.

- Table of Contents
- Project Overview
- Features
- Technology Stack
- Installation
- Usage
- API Integration
- Accessibility
- Responsiveness
- Known Limitations
- Future Enhancements

  Project Overview
  LrnR was initially developed by RV's AI team using jQuery and GO to leverage the ChatGPT API for creating customized quizzes. Due to leadership's directive, the application has been rewritten in Node.js and React, making it more scalable and maintainable. The new version of LrnR retains all the core functionality of the original application while providing an improved user experience and a modern look using Materialize CSS.

Features
Quiz Generation (Categories) Page
Users can create quizzes by selecting:
Topic
Expertise
Number of questions
Style of questions
Generated quizzes include a title, description, and a list of questions.
Quiz Page
Users are presented with one question at a time.
Users can submit their answers.
Results Page
A static recreation of the original Results Page.
Home Page
A static recreation of the original Home Page.
Account Page
A static recreation of the original Account Page.
Technology Stack
Frontend: React, HTML, CSS, Materialize CSS
Backend: Node.js, Express.js
API: OpenAI API (for quiz generation and grading)
Environment Management: dotenv
Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/Tonyyang2525/Lnrn.git
   cd Lnrn

2. Install dependencies
   npm install

3.Set up environment variables:
Access .env file in the server folder.
Add your OpenAI API key
OPENAI_API_KEY=your-api-key-here

Usage

1. Starting the Application
   Start the React application:
   npm start

2. Start the server
   Navigate to the server directory and then run it
   cd server
   node server.js

3. Access the Application
   Open your browser and navigate to http://localhost:3000.

Routing
Home Page: Accessible at /
Account Page: Accessible at /account
Quiz Generation Page: Accessible at /quiz
Quiz Questions Page: Accessible at /questions

API Integration
The application uses the OpenAI API to generate and grade quizzes. The API is integrated into the backend, where it handles the creation of quizzes and grading of answers based on user input.

Endpoints
Create Quiz:

URL: /api/createQuiz
Method: POST
Body Parameters:
topic
expertise
numberOfQuestions
styleOfQuestion
Response: JSON object containing the generated quiz.
Grade Question:

URL: /api/gradeQuestion
Method: POST
Body Parameters:
Quiz (JSON object of the quiz)
Question (The specific question to be graded)
Response: JSON object containing the grading result.

Accessibility
The website is designed to meet HTML & CSS validity and WCAG 2.0 AA web accessibility standards. This ensures that the site is usable by as many people as possible, including those with disabilities.

Responsiveness
LrnR is fully responsive, ensuring a seamless experience across mobile, tablet, and desktop devices. Materialize CSS is used to provide a modern and responsive design.

Known Issues and Limitations
The Results Page, Home Page, and Account Page are static recreations of the original designs.

Future Enhancements
Implementing user authentication and quiz statistics tracking.
Adding more customization options for quiz generation.
Expanding accessibility features.
