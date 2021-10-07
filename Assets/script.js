// Elements 
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const scoreDiv = document.getElementById("score");

// Questions 
let questions = [
    {
        question: "Question 1",
        choiceA: "Choice A (correct)",
        choiceB: "Choice B",
        choiceC: "Choice C",
        correct: "A"
    },
    {
        question: "Question 2",
        choiceA: "Choice A",
        choiceB: "Choice B (correct)",
        choiceC: "Choice C",
        correct: "B"
    },
    {
        question: "Question 3",
        choiceA: "Choice A",
        choiceB: "Choice B",
        choiceC: "Choice C (correct)",
        correct: "C"
    }
]

// Variables
const lastQuestion = questions.length -1;
let runningQuestion = 0; 

// Click Start to begin Quiz
start.addEventListener("click",startQuiz);

// Start Quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    timerCountdown();
}

// Timer Countdown 
var timeEl = document.getElementById("time");
var secondsLeft = 30;

function timerCountdown() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }

  }, 1000);
}

// Render Question 
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;

}

// Check Answer 

// Score 

// Restart Button