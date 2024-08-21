const express = require("express");
const router = express.Router();
const app = express();
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const { createQuiz, gradeQuestion } = require("./server.Quiz");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

//GPT API
router.post("/createQuiz", createQuiz);

router.post("/gradeQuestion", gradeQuestion);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
