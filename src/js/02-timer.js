import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

btn.setAttribute('disabled', '');

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btn.setAttribute('disabled', '');
    } else {
      btn.removeAttribute('disabled');
    }
    const timeAsNumber = new Date().getTime();
    const selectedTimeAsNumber = selectedDates[0].getTime();
    const difference = selectedTimeAsNumber - timeAsNumber;

    const convertMsToDays = 1000 * 60 * 60 * 24;
    const convertMsToHours = 1000 * 60 * 60;
    const convertMsToMinutes = 1000 * 60;
    const convertMsToSeconds = 1000;
    console.log(convertMsToDays);
    if (difference % convertMsToDays > 0) {
      dataDays.textContent = Math.floor(difference / convertMsToDays);
      if (
        (difference - dataDays.textContent * convertMsToDays) %
          convertMsToHours >
        0
      ) {
        dataHours.textContent = Math.floor(
          (difference - dataDays.textContent * convertMsToDays) /
            convertMsToHours
        );
        if (
          (difference -
            dataDays.textContent * convertMsToDays -
            dataHours.textContent * convertMsToHours) %
            convertMsToMinutes >
          0
        ) {
          dataMinutes.textContent = Math.floor(
            (difference -
              dataDays.textContent * convertMsToDays -
              dataHours.textContent * convertMsToHours) /
              convertMsToMinutes
          );
        }
      }
    }

    console.log(timeAsNumber);
    console.log(selectedTimeAsNumber);
    console.log(difference);
    console.log(selectedDates[0]);
  },
});
