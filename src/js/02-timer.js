import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  dataWindow: document.querySelector('.timer'),
};
document.querySelector('[data-start]').setAttribute('disabled', '');

let finalTime = null;

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.removeAttribute('disabled');
      finalTime = selectedDates[0];
    }
  },
};
flatpickr(document.querySelector('#datetime-picker'), options);

class Timer {
  constructor() {
    (this.intervalId = null),
      (this.isActive = false),
      (refs.btnStart.disabled = true);
  }

  start() {
    if (this.isActive) {
      return;
    }
    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = finalTime - startTime;
      const time = convertMs(deltaTime);
      if (deltaTime <= 1000) {
        clearInterval(this.intervalId);
      }
      this.dataWindow(time);
    }, 1000);
  }
  dataWindow({ days, hours, minutes, seconds }) {
    const timerEl = `${days} : ${hours} : ${minutes} : ${seconds}`;
    document.querySelector('.timer').innerHTML = timerEl;
  }
}
const timer = new Timer();
refs.btnStart.addEventListener('click', () => timer.start());