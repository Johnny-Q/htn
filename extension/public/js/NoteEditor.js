//need to edit time stamps//update the divs on the page
var NoteEditor = /** @class */ (function () {
    function NoteEditor(timer, textarea, table) {
        var _this = this;
        // notes = {
        //     "00:00":""
        // };
        // currKey = "00:00";
        this.timestamps = [];
        this.noteBlocks = [];
        this.currStart = "00:00";
        this.timer = timer;
        this.table = table;
        textarea.addEventListener("keypress", function (e) {
            // switch(e.key){
            //     case "Enter":
            //         this.notes[this.currKey] += "\n";
            //         break;
            //     default:
            //         this.notes[this.currKey] += e.key;
            // }
            // console.log(e);
            if (_this.lastKey && _this.lastKey.keyCode == e.keyCode && e.keyCode == 13) {
                e.preventDefault();
                textarea.value = textarea.value.trim();
                if (!textarea.value) {
                    e = null;
                    return;
                }
                ;
                // this.currKey = timer.getTime();
                _this.timestamps.push(_this.currStart);
                _this.currStart = timer.getTime();
                _this.table.querySelector(".temp_timestamp").innerText = timer.getTime();
                //parse textarea
                var rawNotes = textarea.value;
                // this.noteBlocks = rawNotes.trim().split("\n\n");
                _this.noteBlocks.push(textarea.value);
                textarea.value = "";
                _this.lastKey = null;
                _this.update();
                e = null;
            }
            _this.lastKey = e;
        });
    }
    NoteEditor.prototype.update = function () {
        //clear the rows
        this.table.tBodies[0].innerHTML = "";
        // for (let i = 0; i < this.timestamps.length-1; i++) {
        //     this.table.tBodies[0].deleteRow(0);
        // }
        //add the rows
        for (var i = this.timestamps.length - 1; i > -1; i--) {
            var row = this.table.tBodies[0].insertRow(0);
            var timestamp = row.insertCell();
            timestamp.innerText = this.timestamps[i];
            timestamp.classList.add("timestamp");
            var notes = row.insertCell();
            var p = document.createElement("p");
            p.innerText = this.noteBlocks[i];
            notes.append(p);
        }
    };
    NoteEditor.prototype.getNotes = function () {
        return;
    };
    return NoteEditor;
}());
var timer = new Timer(document.querySelector("#startBtn"), document.querySelector("#pauseBtn"), document.querySelector("#timeText"), document.querySelector("#speed"));
var note_editor = new NoteEditor(timer, document.querySelector("textarea"), document.querySelector("#notes"));
document.querySelector("textarea").onkeyup = function () {
    this.style.height = "1px";
    this.style.height = (25 + this.scrollHeight) + "px";
};
