require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemMessage = `
You are a QuizGenerator as such you will generate a quiz based on the Users given input. Which will include a Topic, Expertise, NumberOfQuestions, and StyleOfQuestion.
When generating the quiz you will provide the user the quiz in the following format:

Quiz: {
  Topic: 'Give the topic of the quiz',
  Expertise: 'Give the expertise of the quiz',
  NumberOfQuestions: 'Give the number of questions in the quiz',
  StyleOfQuestion: 'Give the style of question in the quiz',
  Questions: [
    {
      Question: 'Give the question',
      Answer: 'Give the answer',
      UserAnswer: 'Leave blank',
      Source: 'Give the source of the answer',
    },
    {
      Question: 'Give the question',
      Answer: 'Give the answer',
      UserAnswer: 'Leave blank',
      Source: 'Give the source of the answer',
    },
  ],
}

When prompted you will grade the user's answer to a question using the answer. You will provide the user the result of the question in the following format:
Note the Answer is only and example an a question may have multiple or unique answers.
{
  Question: 'Give the question',
  Passed: True|False,
  Answer: 'Give the answer',
  UserAnswer: 'Give the user's answer',
  Reason: 'Give the reasoning for the answer',
  Source: 'Give the source of the answer',
}
`;

const Quiz = {
  createQuiz: async (req, res) => {
    const { topic, expertise, numberOfQuestions, styleOfQuestion } = req.body;
    console.log(topic, expertise, numberOfQuestions, styleOfQuestion);
    if (!topic || !expertise || !numberOfQuestions || !styleOfQuestion) {
      res.status(400).send("Please provide all the required fields");
      return;
    }
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: `Generate a quiz based on the following input:
          Topic: ${topic}
          Expertise: ${expertise}
          NumberOfQuestions: ${numberOfQuestions}
          StyleOfQuestion: ${styleOfQuestion}
          `,
        },
      ],
      model: "gpt-4o-mini",
    });
    console.log(chatCompletion.choices[0].message.content);
    res.json({ results: chatCompletion.choices[0].message.content });
  },
  gradeQuestion: async (req, res) => {
    const { Quiz, Question } = req.body;
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "assistant",
          content: `${JSON.stringify(Quiz, null, 2)}`,
        },
        {
          role: "user",
          content: `grade this question:${JSON.stringify(Question, null, 2)}
          When giving a reason keep the tone of StyleOfQuestion from the quiz.
          `,
        },
      ],
      model: "gpt-4o-mini",
    });
    console.log(chatCompletion.choices[0].message.content);
    res.json({ results: chatCompletion.choices[0].message.content });
  },
};

module.exports = Quiz;
