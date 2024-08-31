const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text:"Shark" , correct: false},
            {text:"Blue Whale" , correct: true},
            {text:"Lion" , correct: false},
            {text:"Elephant" , correct: false},
        ]
    },
    {
        question: "Which is the largest continent in the world?",
        answers: [
            {text:"Africa" , correct: false},
            {text:"Asia" , correct: true},
            {text:"Antartica" , correct: false},
            {text:"Austrlia" , correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text:"India" , correct: false},
            {text:"Nepal" , correct: false},
            {text:"Bhutan" , correct: false},
            {text:"Vatican city" , correct: true},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text:"Sahara" , correct: false},
            {text:"Kalahari" , correct: false},
            {text:"Antarctica" , correct: true},
            {text:"Thar" , correct: false},
        ]
    },
];

const questionElement = document.querySelector("#question");
const answerBtn = document.querySelector("#answers");
const nextBtn = document.querySelector("#next");

let questionIndex =0;
let score =0;

function startQuiz(){
    questionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let curQuestion = questions[questionIndex];
    let questionNo = questionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + curQuestion.question;

    curQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Try Again";
    nextBtn.style.display = "block";
}

function handleNext(){
    questionIndex++;
    if(questionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
    nextBtn.addEventListener("click" , () => {
        if(questionIndex < questions.length){
            handleNext();
        }else{
            startQuiz();
        }
    })



startQuiz();





















