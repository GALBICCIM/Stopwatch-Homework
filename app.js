let startTime, elapsedTime = 0, timerInterval;
let lapNumber = 1;


function startStopwatch() {
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('lapBtn').style.display = 'inline-block';
    document.getElementById('stopBtn').style.display = 'inline-block';
    document.getElementById('resetBtn').style.display = 'inline-block';

    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        displayTime(elapsedTime);
    }, 10);
}


function togglePause() {
    const stopBtn = document.getElementById('stopBtn');
    if (stopBtn.innerText === '일시정지') {
        clearInterval(timerInterval);
        stopBtn.innerText = '재시작';
        document.getElementById('lapBtn').style.display = 'none';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function () {
            elapsedTime = Date.now() - startTime;
            displayTime(elapsedTime);
        }, 10);
        stopBtn.innerText = '일시정지';
        document.getElementById('lapBtn').style.display = 'inline-block';
    }
}


function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapNumber = 1;
    displayTime(elapsedTime);
    displayLaps([]);
    document.getElementById('stopBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
    document.getElementById('lapBtn').style.display = 'none';
    document.getElementById('startBtn').style.display = 'inline-block';
    location.reload();
}


function recordLap() {
    const lapTime = elapsedTime;
    const formattedLapTime = formatTime(lapTime);
    const lapText = `Lap ${lapNumber}: ${formattedLapTime}`;

    const lapOutput = document.getElementById('lapOutput');
    const lapItem = document.createElement('div');
    lapItem.innerText = lapText;
    lapOutput.appendChild(lapItem);

    lapNumber++;
}


function displayTime(time) {
    const seconds = Math.floor(time / 1000);
    const remainingMilliseconds = time % 1000;
    const milliseconds = remainingMilliseconds < 10 ? '00' : remainingMilliseconds < 100 ? '0' + remainingMilliseconds : remainingMilliseconds;

    const formattedTime = `${seconds < 10 ? '0' : ''}${seconds}.${milliseconds}`;

    document.getElementById('output').innerText = formattedTime;
}


function formatTime(time) {
    const seconds = Math.floor(time / 1000);
    const remainingMilliseconds = time % 1000;
    const milliseconds = remainingMilliseconds < 10 ? '00' : remainingMilliseconds < 100 ? '0' + remainingMilliseconds : remainingMilliseconds;

    return `${seconds < 10 ? '0' : ''}${seconds}.${milliseconds}`;
}


function displayLaps(lapArray) {
    const lapOutput = document.getElementById('lapOutput');
    lapOutput.innerHTML = '';
    lapArray.forEach((lap, index) => {
        const lapItem = document.createElement('div');
        lapItem.innerText = `Lap ${index + 1}: ${lap}`;
        lapOutput.appendChild(lapItem);
    });
}
