const inputDate = document.querySelector("#date");
const button = document.querySelector("#button");
const output = document.querySelector("#output");

function reverseStr(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  const reverse = reverseStr(str);

  return str === reverse;
}

function convertDateIntoString(date) {
  const dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function allDatesFormates(date) {
  const dateString = convertDateIntoString(date);

  const ddmmyyyy = dateString.day + dateString.month + dateString.year;
  const mmddyyyy = dateString.month + dateString.day + dateString.year;
  const yyyymmdd = dateString.year + dateString.month + dateString.day;
  const ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
  const mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
  const yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date) {
  const listOfPalindromes = allDatesFormates(date);
  let flag = false;
  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    //checks feb month for leap year
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    //checks that day exceeds max days in month
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }

  return { day: day, month: month, year: year };
}

function getNextPalindromeDate(date) {
  let counter = 0;
  var nextDate = getNextDate(date);

  while (1) {
    counter++;
    var isPalindrome = checkPalindrome(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 3) {
    if (isLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    } else {
      if (day < 1) {
        day = 28;
        month--;
      }
    }
  } else {
    if (day < 1) {
      month--;
      if (month < 1) {
        month = 12;
        year--;
      }
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousPalindromeDate(date) {
  var ctr = 0;
  var previousDate = getPreviousDate(date);

  while (1) {
    ctr++;
    var isPreviousPalindrom = checkPalindrome(previousDate);
    if (isPreviousPalindrom) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }

  return [ctr, previousDate];
}

function clickHandler() {
  const bdayString = inputDate.value;

  if (bdayString !== "") {
    let listOfDates = bdayString.split("-");

    let date = {
      day: Number(listOfDates[2]),
      month: Number(listOfDates[1]),
      year: Number(listOfDates[0]),
    };

    let isPalindrome = checkPalindrome(date);

    if (isPalindrome) {
      output.innerText = `HURREY! your birthdate : ${date.day} / ${date.month} /${date.year} is Palindrome.😃 `;
    } else {
      let [counter, nextDate] = getNextPalindromeDate(date);
      let [ctr, previousDate] = getPreviousPalindromeDate(date);

      output.innerText = `OOOPS! your birthday is not Palindrome.😥 Next date is ${nextDate.day} / ${nextDate.month} /${nextDate.year} , it will come in next ${counter} days!✨ & Previous date was ${previousDate.day} / ${previousDate.month} /${previousDate.year} , is gon by ${ctr} days!✨`;
    }
  } else {
    output.innerText = "Enter valid date to proceed!";
  }
}

//Events
button.addEventListener("click", () => {
  output.innerHTML = "<img src='./gifs/loading.gif' />";
  setTimeout(clickHandler, 3000);
});
