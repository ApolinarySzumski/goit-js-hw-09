import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const data = {
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

btn.setAttribute('disabled', '');

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    changeOfDate(selectedDates);
    console.log(selectedDates[0]);

    const CountdownTimer = () => {
      setInterval(() => {
        changeOfDate(selectedDates);
      }, 1000);
    };

    btn.addEventListener('click', CountdownTimer);
  },
});

const changeOfDate = selectedDates => {
  const now = new Date();
  if (selectedDates[0] <= now) {
    Notiflix.Notify.failure('Please choose a date in the future');
    btn.setAttribute('disabled', '');
  } else {
    btn.removeAttribute('disabled');
  }

  let timeAsNumber = now.getTime();
  let selectedTimeAsNumber = selectedDates[0].getTime();
  let difference = selectedTimeAsNumber - timeAsNumber;

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

  const converted = convertMs(difference);

  data.dataDays.textContent = converted.days.toString().padStart(2, '0');
  data.dataHours.textContent = converted.hours.toString().padStart(2, '0');
  data.dataMinutes.textContent = converted.minutes.toString().padStart(2, '0');
  data.dataSeconds.textContent = converted.seconds.toString().padStart(2, '0');
};
