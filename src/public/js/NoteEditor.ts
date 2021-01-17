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

document.querySelector("textarea").onkeyup = function () {
    this.style.height = "1px";
    this.style.height = (25 + this.scrollHeight) + "px";
}


document.querySelector("#modal_open").onclick = function () {
    let div = document.querySelector("#populate_options");
    let names = {};
    chrome.storage.local.get("notebooks", (res) => {
        if (res.notebooks.length == 0) return;
        console.log(res.notebooks);
        res.notebooks.data.forEach(notebook => {
            names[notebook.name] = notebook.value;
            try {
                let radio = createElement("input");
                radio.type = "radio"; radio.name = "Notebook"; radio.value = notebook.id; radio.id = notebook.name;
                let label = createElement("label", [], notebook.name);
                label.setAttribute("for", notebook.name);
                let br = createElement("br");

                div.append(radio, label, br);
            } catch (err) {

            }
        });

        // names.forEach(name => {
        //     let radio = createElement("input");
        //     radio.type = "radio"; radio.name = "Notebook"; radio.value = ;radio.id = name;
        //     let label = createElement("label", [], name);
        //     label.setAttribute("for", name);
        //     let br = createElement("br");

        //     div.append(radio, label, br);
        // });
    });

    this.onclick = null;
};

document.querySelector("#add_to_notebook").onclick = () => {
    //constuct the note object
    let timestamps = note_editor.timestamps;
    let noteBlocks = note_editor.noteBlocks;

    let name, id;
    //get which notebook was selected
    document.querySelector("#populate_options").querySelectorAll("input[type='radio']").forEach(radio => {
        if (radio.checked) {
            name = radio.id;
            id = radio.value;
        }
    });

    //add the note
    chrome.storage.local.get("notes", (res) => {
        if (!("notes" in res)) return;
        let { notes } = res;
        let title = document.querySelector("#title").value || "Untitled";
        notes.last_id++;
        notes.data.push({
            "id": notes.last_id,
            title,
            "notebook_id": id
        });
        chrome.storage.local.set({ notes });

        //add the time stamps
        chrome.storage.local.get("noteData", (res) => {
            if (!("noteData" in res)) return;
            let { noteData } = res;
            for (let i = 0; i < timestamps.length; i++) {
                noteData.last_id++;
                noteData.data.push({
                    "id": noteData.last_id,
                    "notes_id": notes.last_id,
                    "timestamp": timestamps[i],
                    "text": noteBlocks[i]
                });
            }
            chrome.storage.local.set({noteData});
            window.location.assign("../pages/notebooks.html");
        });
    });
};