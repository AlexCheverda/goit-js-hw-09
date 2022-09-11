const bodyEl = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

buttonStart.addEventListener('click', onStartClr);
buttonStop.addEventListener('click', onStopClr);

let timerId = null;

function onStartClr() {
    buttonStart.disabled = true;
    buttonStop.disabled = false;
    
    timerId = setInterval(() => {
        const changeColor = getRandomHexColor();
        bodyEl.style.background = changeColor;
    }, 1000);
};

function onStopClr() {
    buttonStart.disabled = false;
    buttonStop.disabled = true;
    clearInterval(timerId);
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};