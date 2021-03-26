// const ques = document.querySelector(".questions");
const ques = document.querySelector(".ques");
const timer = document.querySelector("#timer");
let value;
let interval;

fetch("./data/data.json")
  .then((response) => response.json())
  .then((json) => (value = json));

function showQuestions(type1) {
  
  btnDisabler(true);
  
  let para;
  if (type1 === value.easy) {
    para = "easy";    
  } else if (type1 === value.medium) {
    para = "medium";
  } else if (type1 === value.hard) {
    para = "hard";
  }
  let k = 30;
  interval = setInterval(function () {
    timer.innerHTML = `Time Remaining : ${k--}<br><br>`;
    if (k === -1) {
      clearInterval(interval);
      getScore(para);
    }
  }, 1000);

  let display = "";

  for (let i = 0; i < 5; i++) {
    display += `<div> ${i + 1}. ${type1[i].ques}</div>`;

    for (let j = 0; j < 4; j++) {
      display += `<span><input type="radio" id="i${i}j${j}" name="id${i}" value="${type1[i].options[j]}" />
                  <label for="id${i}">${type1[i].options[j]}</label></span>`;
    }
  }

  display += `<br><br><input type="submit" id="submit" onclick=getScore("${para}")><br><br>`;
  ques.innerHTML = display;
}

function easy() {
  showQuestions(value.easy);
}

function medium() {
  showQuestions(value.medium);
}

function hard() {
  showQuestions(value.hard);
}

function btnDisabler(bool) {
  document.querySelector("#easy").disabled = bool;
  document.querySelector("#medium").disabled = bool;
  document.querySelector("#hard").disabled = bool;
}

function getScore(type) {
  let type1;
  if (type === "easy") {
    type1 = value.easy;
  } else if (type === "medium") {
    type1 = value.medium;
  } else {
    type1 = value.hard;
  }

  let ans = "";
  let score = 0;
  let arr = [];
  for (let i = 0; i < 5; i++) {
    let ctr1 = 0;
    let ctr2 = false;
    for (let j = 0; j < 4; j++) {
      ctr1++;
      ctr2 = document.getElementById(`i${i}j${j}`).checked;
      if (ctr2 === true) {
        ans = `i${i}j${j}`;
        break;
      }
    }
    if (
      (ctr1 === 1 || ctr1 === 2 || ctr1 === 3 || ctr1 === 4) &&
      ctr2 === false
    ) {
      arr.push(null);
    } else {
      arr.push(document.getElementById(ans).value);
    }
  }
  for (let i = 0; i < 5; i++) {
    if (arr[i] === type1[i].correct) {
      
      score++;
    }
  }
  console.log(score);
  str = ["Poor", "Poor", "Bad", "Good", "Strong", "Very Strong"];
  document.querySelector(
    "#score"
  ).innerHTML = `Your General Knowledge score is :  ${str[score]} !!!`;
  btnDisabler(false);
  clearInterval(interval);
}
