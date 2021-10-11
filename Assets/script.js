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

// The following function renders items in a todo list as <li> elements
function renderPastScores() {
  // Clear todoList element and update todoCountSpan
  initialList.innerHTML = "";
  initialCountSpan.textContent = pastScores.length;

  // Render a new li for each todo
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

// This function is being called below and will run when the page loads.
function init() {
  // Get stored todos from localStorage
  var storedScores = JSON.parse(localStorage.getItem("pastScores"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedScores !== null) {
    pastScores = storedScores;
  }

  // This is a helper function that will render todos to the DOM
  renderPastScores();
}

function storeScores() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("pastScores", JSON.stringify(pastScores));
}

// Add submit event to form
initialForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var initialText = initialInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (initialText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  pastScores.push(initialText);
  initialInput.value = "";

  // Store updated todos in localStorage, re-render the list
  storeScores();
  renderPastScores();
});

// Add click event to todoList element
initialList.addEventListener("click", function(event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    pastScores.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    storeScores();
    renderPastScores();
  }
});

// Calls init to retrieve data and render it to the page on load
init()