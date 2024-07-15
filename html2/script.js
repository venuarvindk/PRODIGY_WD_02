// script.js

let startTime, updatedTime, difference, tInterval, savedTime = 0;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', addLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 10); // Update the display every 10 milliseconds
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    savedTime = 0;
    display.textContent = '00:00:00.00';
    laps.innerHTML = '';
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.textContent = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

function addLap() {
    const lapTime = document.createElement('div');
    lapTime.textContent = display.textContent;
    laps.appendChild(lapTime);
}
