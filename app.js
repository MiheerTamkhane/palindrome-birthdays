const inputDate = document.querySelector("#date");
const button = document.querySelector("#button");
const output = document.querySelector("#output");
function reverseStr(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  const reverse = reverseStr(str);
  let X = false;
  if (str === reverse) {
    X = true;
  } else {
    X = false;
  }

  return X;
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

  let ddmmyyyy = dateString.day + dateString.month + dateString.year;
  let mmddyyyy = dateString.month + dateString.day + dateString.year;
  let yyyymmdd = dateString.year + dateString.month + dateString.day;
  let ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
  let mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
  let yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date) {
  const listOfPalindromes = allDatesFormates(date);
  let x = false;
  listOfPalindromes.map((palindromes) => {
    if (isPalindrome(palindromes)) {
      x = true;
    }
  });
  return x;
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
    mongth = 1;
    year++;
  }

  return { day: day, month: month, year: year };
}

function getNextPalindromeDate(date) {
  let counter = 0;
  let nextDate = getNextDate(date);

  while (1) {
    counter++;
    let isPalindrome = checkPalindrome(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
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
    if (isPalindrome === true) {
      output.innerText = `HURREY! your birthdate : ${date.day} / ${date.month} /${date.year} is Palindrome. `;
    } else {
      let [counter, nextDate] = getNextPalindromeDate(date);

      output.innerText = `OOOPS! your birthday is not Palindrome. Next date is ${nextDate.day} / ${nextDate.month} /${nextDate.year} , it will come in next ${counter} days!`;
    }
  } else {
    output.innerText = "Enter valid date to proceed.";
  }
}
//Events
button.addEventListener("click", clickHandler);
