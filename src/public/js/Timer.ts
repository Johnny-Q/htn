class Timer {
    speed = 1.0;
    isRunning = false;
    timeElapsedSeconds = 0; //would be a float
    timerFunction;

    timeText: HTMLElement;
    constructor(startBtn, pauseBtn, timeText, speed) {
        startBtn.onclick = () => {
            this.startTimer();
        }
        pauseBtn.onclick = () => {
            this.pauseTimer();
        }

        speed.addEventListener("change", ((e) => {
            console.log(e.target.value);
            this.stopTimer();
            this.setTimeSpeed(e.target.value);
            this.startTimer();
        }));

        this.timeText = timeText;
        //only update every second
        // this.timerFunction = setInterval(() => {
        //     if (this.isRunning) {
        //         this.timeElapsedSeconds += 1 * this.speed;
        //         timeText.innerText = this.getTime();
        //     }
        // }, 1000);
    }
    stopTimer() {
        clearInterval(this.timerFunction);
        this.timerFunction = null;
    }
    pauseTimer() {
        this.isRunning = false;
    }
    startTimer() {
        this.isRunning = true;
        if (!this.timerFunction) {
            this.timerFunction = setInterval(() => {
                if (this.isRunning) {
                    this.timeElapsedSeconds += 1;// * this.speed;
                    this.timeText.innerText = this.getTime();
                }
            }, 1000 / this.speed);
        }
    }
    setTimeSpeed(speed) {
        this.speed = speed;
    }
    getTime() {
        let sec = 0, minutes = 0, hours = 0, totalSeconds = Math.round(this.timeElapsedSeconds);
        hours = Math.floor(totalSeconds / 3600);
        totalSeconds = totalSeconds - (hours * 3600);
        minutes = Math.floor(totalSeconds / 60);
        totalSeconds = totalSeconds - (minutes * 60);
        sec = totalSeconds;
        return `${hours ? `${make2Digits(hours)}:` : ""}${make2Digits(minutes)}:${make2Digits(sec)}`; //format time in seconds to HH:MM:SS
    }
}