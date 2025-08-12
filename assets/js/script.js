/**
 * Questions to be used in the trivia quiz
 */
const questions = [
    {
        question: "What is the capital of Iceland?",
        answers: [
            { text: "Keflavik", correct: false },
            { text: "Akureyri", correct: false },
            { text: "Reykjavik", correct: true },
            { text: "Hafnarfjordur", correct: false }
        ]
    },
    {
        question: "What is the largest glacier in Iceland, and also Europe?",
        answers: [
            { text: "Vatnajökull", correct: true },
            { text: "Langjökull", correct: false },
            { text: "Eyjafjallajökull", correct: false },
            { text: "Mýrdalsjökull", correct: false }
        ]
    },
    {
        question: "Iceland has the world's oldest surviving parliment, when was it established?",
        answers: [
            { text: "1268 AD", correct: false },
            { text: "1564 AD", correct: false },
            { text: "1675 AD", correct: false },
            { text: "930 AD", correct: true }
        ]
    },
    {
        question: "What is the highest mountain in Iceland?",
        answers: [
            { text: "Snæfell", correct: false },
            { text: "Hvannadalshnúkur", correct: true },
            { text: "Öræfajökull", correct: false },
            { text: "Tindfjallajökull", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();