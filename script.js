var correct = 0;
var questionArray = [];
var buttonArray = ["button1","button2","button3","button4"]
var currentQuestion;
var tempQuestionArray=[];

class QandA {
    constructor(question, correctAnswer, answerArray) {
        this.question = question;
        this.answers = answerArray;
        this.correctAnswer = correctAnswer;
    }
    getQuestion() {
        return `${this.question}`;
    }
    getAnswers() {
        return `${this.answers}`;
    }
    getCorrectAnswer() {
        return `${this.correctAnswer}`;
    }
    isAnswerCorrect(answer) {
        return `${this.getCorrectAnswer()}` == answer;
        //return currentQuestion.getCorrectAnswer() == answer;
    }
}
function loadQuestions(){
    const q1 = new QandA("What command line command creates a new directory?","mkdir", ["mkdir","cd","crtdir","makedir"]);
    const q2 = new QandA("What command line command changes the directory?","cd", ["mkdir","cd","swapdir","changedir"]);
    const q3 = new QandA("What command line command lists what is in the directory?","ls", ["list","ls","listdir","lstdir"]);
    const q4 = new QandA("What command line command prints the current directory?","pwd", ["pntdir","cd","pwd","ptdir"]);
    const q5 = new QandA("What command line command starts a local browser window?","python -m http.server 8080", ["python -m http.server 8080","stBrowser","startbwsr","strtlclbwser"]);
    return  [q1,q2,q3,q4,q5];
}

function setupQuestions(){
    questionArray = loadQuestions();
    tempQuestionArray = loadQuestions();
}
function reset(){
    correct =0;
    setupQuestions();
    document.getElementById("numCorrect").innerHTML = correct;
    document.getElementById("progressBar").value = correct;
}

function nextQuestion(){
    if (tempQuestionArray.length != 0){
        currentQuestion = tempQuestionArray.splice(Math.floor(Math.random()*tempQuestionArray.length),1)[0];
        document.getElementById("questionText").innerHTML = currentQuestion.getQuestion();
        var tempButtonArray = buttonArray.slice(0);
        for (var i = buttonArray.length;i>0;i--){ //load buttons 
            currentButton = tempButtonArray.splice(Math.floor(Math.random()*i), 1);
            document.getElementById(currentButton).innerHTML = currentQuestion.getAnswers().split(",")[i-1];
        }
    }else{
        document.getElementById("questionText").innerHTML= "GAME OVER!";
        var answer = prompt("Play again (y/n)").toLowerCase();
        if (answer == "y"){
            reset();
            nextQuestion();
        }else{
            document.getElementById("questionText").innerHTML = "Good bye!";
    }
}
}

function buttonClick() {
    if ((currentQuestion.isAnswerCorrect(this.innerHTML))){
        correct++;
        document.getElementById("numCorrect").style.color = "green";
        document.getElementById("numCorrect").innerHTML = correct;
        document.getElementById("progressBar").value = correct;
    }else{
        document.getElementById("numCorrect").style.color = "red";}
        
    nextQuestion();
}

setupQuestions()
window.onload=function(){
    document.getElementById("progressBar").max = tempQuestionArray.length;
    nextQuestion();
    var buttons = document.getElementsByClassName("answerButton");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', buttonClick, false);
    }
}




