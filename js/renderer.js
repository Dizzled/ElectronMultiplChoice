// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
document.getElementById('submit_button').addEventListener('click',submitAnswers);
let modal = document.getElementById("Modal");
let span = document.getElementById("finalGrade");
let storedEmail = JSON.parse((window.localStorage.getItem('user')));

let questions = document.getElementsByClassName("Question");

let answers = document.getElementsByName("answer");

let i, k, check, userAnswerCorrect = [], userAnswerIncorrect = [],correctAnswers = 0;

function submitAnswers() {

  for (k = 0; k < answers.length; k++) {

    check = answers[k].getAttribute('data-calcvalue');
    if (check === "true") {
      correctAnswers++;
    }

    if(answers[k].getAttribute('data-calcvalue') === "false"  && answers[k].checked === true){
      userAnswerIncorrect.push("false");

    }else if(answers[k].getAttribute('data-calcvalue') === "true"  && answers[k].checked === true){
      userAnswerCorrect.push("true");
    }
  }

  if(userAnswerIncorrect.includes("false")){

    alert(`There are ${userAnswerIncorrect.length} incorrect answers`);
    userAnswerIncorrect.length = 0;
  }
  else if(userAnswerCorrect.length == correctAnswers) {

    span.innerHTML =`Grade Submitted`;
    modal.style.display = "block";
    sendMail();
    answers.length = 0;

  }
   else

    alert("Make sure to select all correct answers");
    userAnswerCorrect.length = 0;
    correctAnswers = 0;
}

  document.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


function sendMail(){
  let link = `mailto:dlagrone@aerovel.com?subject=MO_FINAL&body=${storedEmail.name}:PASSED`;
  window.location.href = link;
  console.log(link);
}


