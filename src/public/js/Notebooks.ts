/**
 * Notebook
 *      list of notes
 *          video
 *          flashcards
 */
class Note {
    flashcardList: Array<Flashcard>;
    timestamps: Array<string>;
    text_blocks: Array<string>;
    title: string;
    id: number;
    constructor() {

    }
    addVideo() {
        let v_url, v_name;
        let videoObj = new Video(v_url, v_name);
    }
    addFlashcard() {
        let ques, ans;
        let card = new Flashcard(ques, ans)
        this.flashcardList.push(card);
    }
    addTimestamps() {

    }
    addTextblocks() {

    }
    deleteFlashCard(index) {
        this.flashcardList.splice(index, 1);
    }
}

class Notebook {
    pic_url: string;
    name: string;
    notesList: Array<Note>;
    horizontalNotes: Array<Note>;
    verticalNotes: Array<Note>;
    notebookDiv;

    id;
    constructor(pic_url, name, notesList = []) {
        this.pic_url = pic_url;
        this.name = name;
        this.notesList = notesList;

        this.notebookDiv = createElement("div", ["notebook"]);
        let img = createElement("div", ["cover_img", "ratio", "ratio-2x3"]);
        img.style["background-image"] = `url('${pic_url}')`;
        // img.style = `background-image:url('${pic_url}');`;

        let label = createElement("div", ["label"]);
        let small = createElement("small", [], this.notesList.length ? `${this.notesList.length} Note${this.notesList.length == 1 ? "s" : ""}` : "No Notes");
        let h2 = createElement("h2", ["display-6"], name);
        label.append(small, h2);

        this.notebookDiv.append(img, label);
        this.notebookDiv.onclick = () => {
            window.open("../pages/subject.html", "__blank");
        };
    }

    addNote(title) {
        let n = new Note();
        this.notesList.push(n);

        //update the text;
        chrome.storage.local.get("notes", (res) => {
            if (!("notes" in res)) return;
            let { notes } = res;
            notes.data.push({
                "id": notes.last_id + 1,
                title,
                "notebook_id": this.id
            });
            notes.last_id++;
            chrome.storage.local.set({ "notes": notes });
        });
    }

    deleteNote(index) {
        this.notesList.splice(index, 1);
    }

    viewNote() {

    }
}

class NotebookManager {
    notebookList: Array<Notebook>;
    notebookGrid;
    constructor(notebookGrid) {
        this.notebookGrid = notebookGrid
        this.notebookList = [];
    }

    addNotebook(picture_url, name, update = true) {
        let nBook = new Notebook(picture_url, name);
        this.notebookList.push(nBook);
        this.notebookGrid.append(nBook.notebookDiv);

        //update storage
        if (update) {
            chrome.storage.local.get("notebooks", (res) => {
                if (!("notebooks" in res)) return;
                let { notebooks } = res;
                notebooks.data.push({
                    "id": notebooks.last_id + 1,
                    picture_url,
                    name
                });
                notebooks.last_id++;
                chrome.storage.local.set({ "notebooks": notebooks });
            });
        }
    }
    deleteNoteBook(id) {
        // this.notebookList.splice(index, 1);
        // chrome.storage.local.set({ "notebooks": this.exportNotebooks() });
    }

    exportNotebooks() {
        let temp = [];

        return this.notebookList;
    }
}

document.querySelectorAll(".notebook").forEach(notebook => {
    notebook.onclick = () => {
        window.open("../pages/subject.html", "__blank");
    };
});

let notebook_manager = new NotebookManager(document.querySelector(".notebooks_grid"));
chrome.storage.local.get("notebooks", (res) => {
    if (res.notebooks.length == 0) return;
    console.log(res.notebooks);
    res.notebooks.data.forEach(notebook => {
        notebook_manager.addNotebook(notebook.picture_url, notebook.name, false);
    })
});
// notebook_manager.addNotebook("https://images.unsplash.com/photo-1602928309809-776bf9db8658?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2143&q=80", "Chemistry");
// notebook_manager.addNotebook("https://images.unsplash.com/photo-1541186877-bb5a745edde5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cm9ja2V0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60", "Rocket Science");
// notebook_manager.addNotebook("https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8YXJjaGl0ZWN0dXJlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60", "Architecture");
// notebook_manager.addNotebook("https://images.unsplash.com/photo-1549490349-8643362247b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80", "Art");
document.getElementById("createNotebook").addEventListener("click", () => {
    let name = document.querySelector("#Notebook");
    let image = document.querySelector("#Image");

    if (!name.value || !image.value) return;

    notebook_manager.addNotebook(image.value, name.value);

    name.value = "";
    image.value = "";
});
