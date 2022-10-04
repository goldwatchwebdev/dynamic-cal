const currentDate = document.querySelector(".current-date"),
  daysTag = document.querySelector(".days"),
  prevNextIcon = document.querySelectorAll(".icons span");

// get new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

//convert month number into month name
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  // getting the first day of the month
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    // getting the last date of the month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    // getting the last day of the month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    // getting the last date of the previous month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  // creating li of previous month last days
  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  // creating li of all days of current month 
  for (let i = 1; i <= lastDateofMonth; i++) {
    // adding active class to li if the current day, month, and year matched
    let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                  && currYear === new Date().getFullYear() ? "active" : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }
  // creating li of next month first days 
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => { // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1, else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    renderCalendar();

    // if current month is less tahn 0 or greater than 11
    if(currMonth < 0 || currMonth > 11) {
        // creating a new date of current year & month and pass it as date value
        date = new Date(currYear, currMonth);
        // updating current year with new date year
        currYear = date.getFullYear();
        // updating current month with new date month
        currMonth = date.getMonth();
    // else pass new Date as date value
    } else {
        date = new Date();
    }
    renderCalendar();
  }); 
});
