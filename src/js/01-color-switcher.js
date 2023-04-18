const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop');
const body = document.body;
let intervalId = null;

stopBtn.setAttribute('disabled', '');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeColor = () => {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled');
};

const stopChanging = () => {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', '');
};

startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', stopChanging);
