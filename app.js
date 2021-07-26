const date = document.getElementById("date");
const button = document.getElementById("button");

function checkPalindrome() {
  const userDate = date.value;
  console.log(userDate);
  //format one ddmmyy
  const forwardDate = userDate.split("-").reverse().join("");
  console.log(forwardDate);
  const one = forwardDate.substring(0, 4);
  const reversedOne = one.split("").reverse().join("");
  console.log(reversedOne);
  const two = forwardDate.substring(4);
  console.log(one, two);
  if (one === two) {
    console.log("hurrey");
  } else {
    console.log("nope");
  }
  //format two yymmdd
  const BackwardDate = userDate.split("-").join("");
  console.log(BackwardDate);
}

//Events
button.addEventListener("click", checkPalindrome);
