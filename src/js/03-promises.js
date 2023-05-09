const btn = document.querySelector('[type = submit]');
const inputDelay = document.querySelector('[name = delay]');
const inputStep = document.querySelector('[name = step]');
const inputAmount = document.querySelector('[name = amount]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    return Promise.resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    // Reject
    return Promise.reject(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

function createPromises() {
  startingDelay = inputDelay.value;
  delay = inputStep.value;
  theAmount = inputAmount.value;
  for (let position = 0; position <= theAmount; position++) {
    createPromise(position, delay)
      .then(msg => {
        console.log(msg);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
btn.addEventListener('click', createPromises);
