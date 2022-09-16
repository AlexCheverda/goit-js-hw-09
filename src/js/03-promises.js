// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector(`input[name='delay']`),
  inputStep: document.querySelector(`input[name='step']`),
  inputAmount: document.querySelector(`input[name='amount']`),
  submitBtn: document.querySelector(`button[type='submit']`),
}

refs.form.addEventListener('submit', onSubmitForm);

  function onSubmitForm(evt) {
  evt.preventDefault();
  let { delay, step, amount } = onGetDate();

  // let amount = Number(refs.inputAmount.value);
  // let delay = Number(refs.inputDelay.value);
  // let step = Number(refs.inputStep.value);
  for (let position = 1; position <= amount; position += 1) {
    // console.log('step', step);
    // console.log('delay', delay);
    createPromise(position, delay)
      .then(result => Notify.success(result))
      .catch(error => Notify.failure(error));
    delay += step;
  }
  }

  function onGetDate() {
  return {
    delay: Number(refs.inputDelay.value),
    step: Number(refs.inputStep.value),
    amount: Number(refs.inputAmount.value),
  };
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
    
  });  
}

