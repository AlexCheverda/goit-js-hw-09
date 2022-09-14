// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysSpan: document.querySelector.apply('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
  inputDate: document.querySelector('#datetime-picker'),
};

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0] <= Date.now()) {
//       window.alert('Please choose a date in the future');
//       return;
//     }
//     refs.startBtn.addEventListener('click', () => {
//       timer.start();
//     });
//     // console.log(selectedDates[0]);
//   },
// };


//new
// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';
// const refs = {
//   // inputDate: document.querySelector('#datetime-picker '),
//   // startBtn: document.querySelector('[data-start]'),
//   daysSpan: document.querySelector('[data-days]'),
//   hoursSpan: document.querySelector('[data-hours]'),
//   minutesSpan: document.querySelector('[data-minutes]'),
//   secondsSpan: document.querySelector('[data-seconds]'),
// };
// const {
//   inputDate,
//   startBtn,
//   daysSpan,
//   hoursSpan,
//   minutesSpan,
//   secondsSpan,
// } = refs;
let currentTime = new Date();
let selectedDatesUTC = 0;
let intervalId = null;
startBtn.addEventListener('click', toStartTimer);
startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDatesUTC = selectedDates[0].getTime();
    if (selectedDates[0].getTime() < currentTime.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 2000,
      });
      startBtn.disabled = true;
    } else startBtn.disabled = false;
  },
};
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0].getTime() <= Date.now()) {
//       Notify.failure(`Please choose a date in the future`);
//       // selectedDates[0] = new Date();
//     } else {
//       selectedTime = selectedDates[0];
//       refs.startBtn.disabled = false;
//     }
//   },
// };
flatpickr(inputDate, options);
function toStartTimer() {
  inputDate.disabled = true;
  startBtn.disabled = true;
  intervalId = setInterval(() => {
    let nowUTC = new Date().getTime();
    getTimerValue(nowUTC);
    let sumDateValue = days + hours + minutes + seconds;
    if (sumDateValue === 0) {
      clearInterval(intervalId);
    }
    daysSpan.textContent = padStart(days);
    hoursSpan.textContent = padStart(hours);
    minutesSpan.textContent = padStart(minutes);
    secondsSpan.textContent = padStart(seconds);
  }, 1000);
}
function getTimerValue(now) {
  let timerValue = convertMs(selectedDatesUTC - now);
  return ({ days, hours, minutes, seconds } = timerValue);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function padStart(numb) {
  return String(numb).padStart(2, 0);
}
//new






// const fp = flatpickr('#datetime-picker', options);
// refs.input.addEventListener('click', () => {

// });

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// class Timer {
//   constructor({onTick}) {
//     this.intervalId = null;
//     this.isActive = false;
//     this.onTick = onTick;
//   }
//   start() {
//     if (this.isActive) {
//       return;
//     }
//     const startTime = Date.now();
//     this.isActive = true;

//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = currentTime - startTime;
//       const time = getTimeComponents(deltaTime);
//       this.onTick(time)
//       // updateClockface(time);
//     }, 1000);
//   }
//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//   }
// }



// const timer = new Timer({
//   onTick: updateClockface
// });

// // refs.startBtn.addEventListener('click', () => {
// //   timer.start();
// // });


// function updateClockface({ hours, mins, secs }) {
//   refs.clockface.textContent = `${hours}:${mins}:${secs}`;
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');  
// }

// function getTimeComponents(time) {
//   const hours = addLeadingZero(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
//   const mins = addLeadingZero(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//   const secs = addLeadingZero(Math.floor((time % (1000 * 60)) / 1000));

//   return { hours, mins, secs };
// }





// const today = new Date();
// let selectedDateUTC = 0;
// let intervalId = null

// refs.startBtn.disabled = true;

// flatpickr('#datetime-pcker', {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//   onClose(selectedDates) {
//     selectedDateUTC = selectedDates[0].getTime();
//     dateValidation(selectedDates[0]);
    
//     },
// });

// function dateValidation(date) {
//   if (date <= today) {
//     Notify.warning('Please choose a date in the future', {
//       timeout: 3000,
//     });
//     refs.startBtn.disabled = true;
//   }
//   if (date > today) {
//     refs.startBtn.disabled = false;
//   }
// }

// function startTimer() {
//   refs.startBtn.disabled = true;
//   intervalId = setInterval(() => {
//     let nowUTC = new Date().getTime();
//     getTimerValue(nowUTC);
//     let sumDateValue = days + hours + minutes + seconds;
//     if (sumDateValue === 0) {
//       clearInterval(intervalId);
//     }
//     refs.days.textContent = padStart(days);
//     refs.hours.textContent = padStart(hours);
//     refs.minutes.textContent = padStart(minutes);
//     refs.seconds.textContent = padStart(seconds);
//   }, 1000);
// }

// function padStart(num) {
//   return String(num).padStart(2, 0);
// }

// function getTimerValue(now) {
//   let timerValue = convertMs(selectedDateUTC - now);
//   return ({ days, hours, minutes, seconds } = timerValue);
// }
// function convertMs(ms) {
  // Number of milliseconds per unit of time
  // const second = 1000;
  // const minute = second * 60;
  // const hour = minute * 60;
  // const day = hour * 24;
  
  // Remaining days
  // const days = Math.floor(ms / day);
  // Remaining hours
  // const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  // const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
//   return { days, hours, minutes, seconds };
// }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
  
// function addLeadingZero(value) {
//   padStart();
// };


// const timer = new timer({
//   onTick: updateClockFace,
// });

// refs.btnStart.addEventListener('click', timer.start.bind(timer));


// function updateClockFace({ days, hours, minutes, seconds }) {
//   refs.days.textContent = `${days}`;
//   refs.hours.textContent = `${hours}`;
//   refs.minutes.textContent = `${minutes}`;
//   refs.seconds.textContent = `${ seconds }`;
// }

