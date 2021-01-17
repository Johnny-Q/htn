var Timer = /** @class */ (function () {
    function Timer(startBtn, pauseBtn, timeText, speed) {
        var _this = this;
        this.speed = 1.0;
        this.isRunning = false;
        this.timeElapsedSeconds = 0; //would be a float
        startBtn.onclick = function () {
            _this.startTimer();
        };
        pauseBtn.onclick = function () {
            _this.pauseTimer();
        };
        speed.addEventListener("change", (function (e) {
            console.log(e.target.value);
            _this.stopTimer();
            _this.setTimeSpeed(e.target.value);
            _this.startTimer();
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
    Timer.prototype.stopTimer = function () {
        clearInterval(this.timerFunction);
        this.timerFunction = null;
    };
    Timer.prototype.pauseTimer = function () {
        this.isRunning = false;
    };
    Timer.prototype.startTimer = function () {
        var _this = this;
        this.isRunning = true;
        if (!this.timerFunction) {
            this.timerFunction = setInterval(function () {
                if (_this.isRunning) {
                    _this.timeElapsedSeconds += 1; // * this.speed;
                    _this.timeText.innerText = _this.getTime();
                }
            }, 1000 / this.speed);
        }
    };
    Timer.prototype.setTimeSpeed = function (speed) {
        this.speed = speed;
    };
    Timer.prototype.getTime = function () {
        var sec = 0, minutes = 0, hours = 0, totalSeconds = Math.round(this.timeElapsedSeconds);
        hours = Math.floor(totalSeconds / 3600);
        totalSeconds = totalSeconds - (hours * 3600);
        minutes = Math.floor(totalSeconds / 60);
        totalSeconds = totalSeconds - (minutes * 60);
        sec = totalSeconds;
        return "" + (hours ? this.make2Digits(hours) + ":" : "") + this.make2Digits(minutes) + ":" + this.make2Digits(sec); //format time in seconds to HH:MM:SS
    };
    Timer.prototype.make2Digits = function (num) {
        if (num < 10) {
            return "0" + num.toString();
        }
        return num.toString();
    };
    return Timer;
}());
