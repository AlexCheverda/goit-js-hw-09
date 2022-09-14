import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDelay: document.querySelector(`input[name='delay']`),
  inputStep: document.querySelector(`input[name='step']`),
  inputAmount: document.querySelector(`input[name='amount']`),
  submitBtn: document.querySelector(`button`),
}

refs.submitBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  let amount = Number(refs.inputAmount.value);
  let delay = Number(refs.inputDelay.value);
  let step = Number(refs.inputStep.value);
  for (let position = 1; position <= amount; position += 1) {
    console.log('step', step);
    console.log('delay', delay);
    setTimeout(() => {
      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, delay)
    delay += step;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
    } else {
      // Reject
      reject(() => console.log(`error`));
      console.log(delay);
    }
  });  
}