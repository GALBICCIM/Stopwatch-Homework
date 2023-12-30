let startTime, elapsedTime = 0, timerInterval;
let lapNumber = 1;  // 랩 나열을 위한 변수


// 시작
function startStopwatch() {
    // 시작 버튼을 눌렀을 때 시작을 제외한 모든 버튼 표시
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


// 일시정지, 재시작 표시
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


// 초기화
function resetStopwatch() {
    clearInterval(timerInterval);

    elapsedTime = 0;
    lapNumber = 1;

    displayTime(elapsedTime);
    displayLaps([]);
    
    location.reload();  // 초기화 버튼을 눌렀을 때 처음 페이지로 이동
}


// 랩 기록
function recordLap() {
    const lapTime = elapsedTime;
    const formattedLapTime = formatTime(lapTime);
    const lapText = `Lap ${lapNumber}: ${formattedLapTime}`;

    // lapOutput div에 출력
    const lapOutput = document.getElementById('lapOutput');
    const lapItem = document.createElement('div');
    lapItem.innerText = lapText;
    lapOutput.appendChild(lapItem);

    lapNumber++;
}


// 시간을 화면에 보여주는 함수
function displayTime(time) {
    const seconds = Math.floor(time / 1000);
    const remainingMilliseconds = time % 1000;
    const milliseconds = remainingMilliseconds < 10 ? '00' : remainingMilliseconds < 100 ? '0' + remainingMilliseconds : remainingMilliseconds;

    const formattedTime = `${seconds < 10 ? '0' : ''}${seconds}.${milliseconds}`;

    document.getElementById('output').innerText = formattedTime;
}


// 시간 기록 과정
function formatTime(time) {
    const seconds = Math.floor(time / 1000);
    const remainingMilliseconds = time % 1000;
    const milliseconds = remainingMilliseconds < 10 ? '00' : remainingMilliseconds < 100 ? '0' + remainingMilliseconds : remainingMilliseconds;

    return `${seconds < 10 ? '0' : ''}${seconds}.${milliseconds}`;
}


// 랩 기록을 화면에 출력하기 위한 함수
function displayLaps(lapArray) {
    const lapOutput = document.getElementById('lapOutput');
    lapOutput.innerHTML = '';
    
    lapArray.forEach((lap, index) => {
        const lapItem = document.createElement('div');
        lapItem.innerText = `Lap ${index + 1}: ${lap}`;
        lapOutput.appendChild(lapItem);
    });
}
