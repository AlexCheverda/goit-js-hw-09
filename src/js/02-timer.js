// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({ position: 'center-top' });

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector.apply('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
  }
}

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = getTimeComponents(deltaTime);
      // console.log('start -> startTime', currentTime);
      // console.log('start -> startTime', startTime);
      updateClockface(time);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  },
};

refs.startBtn.addEventListener('click', () => {
  timer.start();
});


function updateClockface({ hours, mins, secs }) {
  refs.clockface.textContent = `${hours}:${mins}:${secs}`;
}

function pad(value) {
  return String(value).padStart(2, '0');  
}

function getTimeComponents(time) {
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { hours, mins, secs };
}





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

