//need to edit time stamps//update the divs on the page
class NoteEditor {
    timer;
    lastKey;

    // notes = {
    //     "00:00":""
    // };
    // currKey = "00:00";

    timestamps = [];
    noteBlocks = [];

    currStart = "00:00";

    table;

    constructor(timer, textarea, table) {
        this.timer = timer;
        this.table = table;

        textarea.addEventListener("keypress", (e) => {
            // switch(e.key){
            //     case "Enter":
            //         this.notes[this.currKey] += "\n";
            //         break;
            //     default:
            //         this.notes[this.currKey] += e.key;
            // }
            // console.log(e);

            if (this.lastKey && this.lastKey.keyCode == e.keyCode && e.keyCode == 13) {
                e.preventDefault();
                textarea.value = textarea.value.trim();
                if (!textarea.value) { e = null; return; };
                // this.currKey = timer.getTime();
                this.timestamps.push(this.currStart);

                this.currStart = timer.getTime();
                this.table.querySelector(".temp_timestamp").innerText = timer.getTime();
                //parse textarea
                let rawNotes = textarea.value;
                // this.noteBlocks = rawNotes.trim().split("\n\n");
                this.noteBlocks.push(textarea.value);

                textarea.value = "";
                this.lastKey = null;
                this.update();

                e = null;
            }
            this.lastKey = e;
        });
    }

    update() {
        //clear the rows
        this.table.tBodies[0].innerHTML = "";
        // for (let i = 0; i < this.timestamps.length-1; i++) {
        //     this.table.tBodies[0].deleteRow(0);
        // }

        //add the rows
        for (let i = this.timestamps.length - 1; i > -1; i--) {
            let row = this.table.tBodies[0].insertRow(0);
            let timestamp = row.insertCell();
            timestamp.innerText = this.timestamps[i];
            timestamp.classList.add("timestamp");

            let notes = row.insertCell();
            let p = document.createElement("p");
            p.innerText = this.noteBlocks[i];
            notes.append(p);
        }

    }

    getNotes() {
        return
    }
}

let timer = new Timer(document.querySelector("#startBtn"), document.querySelector("#pauseBtn"), document.querySelector("#timeText"), document.querySelector("#speed"));
let note_editor = new NoteEditor(timer, document.querySelector("textarea"), document.querySelector("#notes"));


function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (25 + element.scrollHeight) + "px";
}
