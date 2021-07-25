const date = document.getElementById("date");
const button = document.getElementById("button");

//functions
function clickHandler() {
  console.log(date.value);
  const userDate = date.value;
  const dateSplit = userDate.split("-");
  const reverseDate = date.value.split("").reverse().join("");
  console.log(reverseDate);
  if (userDate === reverseDate) {
    console.log(true);
  } else {
    console.log(false);
  }

  const year = dateSplit[0];

  const month = dateSplit[1];

  const day = dateSplit[2];
  //format one
  const ddmmyy = day + month + year;
  console.log(ddmmyy);
  const formatOne = ddmmyy.split("").reverse().join("");
  console.log(formatOne);
  //format two
  const yymmdd = year + month + day;
  //format three
  const mmddyy = month + day + year;
  //format four
  const yyddmm = year + month + day;
}

//events
button.addEventListener("click", clickHandler);
