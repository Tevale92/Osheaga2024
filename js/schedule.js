// setting local storage for what day is selected
localStorage.setItem("day", 1);

// creating arrays for the <a> and <img> attributes
const imgPath = ["../medias/day1_schedule.jpg", "../medias/day2_schedule.jpg", "../medias/day3_schedule.jpg"];
const imgLinks = ["friday.html", "saturday.html", "sunday.html"];
const imgAlt = ["Osheaga 2024 Friday Schedule", "Osheaga 2024 Saturday Schedule", "Osheaga 2024 Sunday Schedule"];

// declaring a variable to modify the html content
let daySchedules = document.getElementById("day-schedules");

// adding the onclick eventlisteners for the next and previous arrows
document.getElementById("next").addEventListener("click", () => nextDay(true));
document.getElementById("previous").addEventListener("click", () => nextDay(false));

// function to change days, next day if true and previous day if false
function nextDay (bool) {
    let day = localStorage.getItem("day");

    if (bool) {
        if (day < 3) {
            day++;
        }
    } else {
        if (day > 1) {
            day--;
        }
    }

    localStorage.setItem("day", day);
    updateSchedule(day);
}

// function to update the html content of the schedule element
function updateSchedule (day) {
    daySchedules.innerHTML = `<a href="${imgLinks[day - 1]}">
    <img id="day${day}-schedule" class="interactive-img" src="${imgPath[day - 1]}" alt="${imgAlt[day - 1]}">
    </a>`;
}

// initializing the page with the first day's schedule
updateSchedule(localStorage.getItem("day"));