// Elements 
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const score = document.getElementById("score");
const userScore = document.getElementById("userscore");

// Questions 
let questions = [
    {
        question: "What is Javascript?",
        choiceA: "Programming Language",
        choiceB: "Nothing",
        choiceC: "Dog breed",
        correct: "A"
    },
    {
        question: "When was Javascript created?",
        choiceA: "1800",
        choiceB: "1995",
        choiceC: "2010",
        correct: "B"
    },
    {
        question: "How do you create a function?",
        choiceA: "function = myFunction",
        choiceB: "function: myFunction",
        choiceC: "function myFunction ()",
        correct: "C"
    },
    {
        question: "Is Javascript the same as Java?",
        choiceA: "Yes",
        choiceB: "No",
        choiceC: "I'm not sure",
        correct: "B"
    }
]

let scoreCount = 0;
const lastQuestion = questions.length - 1;
let runningQuestion = 0;

// Start Quiz
start.addEventListener("click",startQuiz);

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
      renderScore();
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

// Check Answers
function checkAnswer(answer){
    if(answer == questions[runningQuestion].correct){
        scoreCount++;
    }else{
        secondsLeft--;
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        renderScore();
    }
}

// Score 
function renderScore(){
    score.style.display = "block";
    quiz.style.display = "none";

    const finalScore = Math.round(100 * scoreCount/questions.length);

    userScore.innerHTML = finalScore + "%"; 
}

// Past Scores
var initialInput = document.querySelector("#initial-text");
var initialForm = document.querySelector("#initial-form");
var initialList = document.querySelector("#initial-list");
var initialCountSpan = document.querySelector("#initial-count");

var pastScores = [];

function renderPastScores() {
  initialList.innerHTML = "";
  initialCountSpan.textContent = pastScores.length;

  for (var i = 0; i < pastScores.length; i++) {
    var pastScore = pastScores[i];

    var li = document.createElement("li");
    li.textContent = pastScore;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Remove";

    li.appendChild(button);
    initialList.appendChild(li);
  }
}

function init() {
  var storedScores = JSON.parse(localStorage.getItem("pastScores"));

  if (storedScores !== null) {
    pastScores = storedScores;
  }

  renderPastScores();
}

function storeScores() {
  localStorage.setItem("pastScores", JSON.stringify(pastScores));
}

initialForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var initialText = initialInput.value.trim();

  if (initialText === "") {
    return;
  }

  pastScores.push(initialText);
  initialInput.value = "";

  storeScores();
  renderPastScores();
});

initialList.addEventListener("click", function(event) {
  var element = event.target;

  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    pastScores.splice(index, 1);

    storeScores();
    renderPastScores();
  }
});

init()