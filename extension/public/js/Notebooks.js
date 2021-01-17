/**
 * Notebook
 *      list of notes
 *          video
 *          flashcards
 */
var Note = /** @class */ (function () {
    function Note() {
    }
    Note.prototype.addVideo = function () {
        var v_url, v_name;
        var videoObj = new Video(v_url, v_name);
    };
    Note.prototype.addFlashcard = function () {
        var ques, ans;
        var card = new Flashcard(ques, ans);
        this.flashcardList.push(card);
    };
    Note.prototype.addTimestamps = function () {
    };
    Note.prototype.addTextblocks = function () {
    };
    Note.prototype.deleteFlashCard = function (index) {
        this.flashcardList.splice(index, 1);
    };
    return Note;
}());
var Notebook = /** @class */ (function () {
    function Notebook(pic_url, name, notesList) {
        if (notesList === void 0) { notesList = []; }
        this.pic_url = pic_url;
        this.name = name;
        this.notesList = notesList;
        this.notebookDiv = createElement("div", ["notebook"]);
        var img = createElement("div", ["cover_img", "ratio", "ratio-2x3"]);
        img.style["background-image"] = "url('" + pic_url + "')";
        // img.style = `background-image:url('${pic_url}');`;
        var label = createElement("div", ["label"]);
        var small = createElement("small", [], this.notesList.length ? this.notesList.length + " Note" + (this.notesList.length == 1 ? "s" : "") : "No Notes");
        var h2 = createElement("h2", ["display-6"], name);
        label.append(small, h2);
        this.notebookDiv.append(img, label);
        this.notebookDiv.onclick = function () {
            window.open("../pages/subject.html", "__blank");
        };
    }
    Notebook.prototype.addNote = function (title) {
        var _this = this;
        var n = new Note();
        this.notesList.push(n);
        //update the text;
        chrome.storage.local.get("notes", function (res) {
            if (!("notes" in res))
                return;
            var notes = res.notes;
            notes.data.push({
                "id": notes.last_id + 1,
                title: title,
                "notebook_id": _this.id
            });
            notes.last_id++;
            chrome.storage.local.set({ "notes": notes });
        });
    };
    Notebook.prototype.deleteNote = function (index) {
        this.notesList.splice(index, 1);
    };
    Notebook.prototype.viewNote = function () {
    };
    return Notebook;
}());
var NotebookManager = /** @class */ (function () {
    function NotebookManager(notebookGrid) {
        this.notebookGrid = notebookGrid;
        this.notebookList = [];
    }
    NotebookManager.prototype.addNotebook = function (picture_url, name, update) {
        if (update === void 0) { update = true; }
        var nBook = new Notebook(picture_url, name);
        this.notebookList.push(nBook);
        this.notebookGrid.append(nBook.notebookDiv);
        //update storage
        if (update) {
            chrome.storage.local.get("notebooks", function (res) {
                if (!("notebooks" in res))
                    return;
                var notebooks = res.notebooks;
                notebooks.data.push({
                    "id": notebooks.last_id + 1,
                    picture_url: picture_url,
                    name: name
                });
                notebooks.last_id++;
                chrome.storage.local.set({ "notebooks": notebooks });
            });
        }
    };
    NotebookManager.prototype.deleteNoteBook = function (id) {
        // this.notebookList.splice(index, 1);
        // chrome.storage.local.set({ "notebooks": this.exportNotebooks() });
    };
    NotebookManager.prototype.exportNotebooks = function () {
        var temp = [];
        return this.notebookList;
    };
    return NotebookManager;
}());
document.querySelectorAll(".notebook").forEach(function (notebook) {
    notebook.onclick = function () {
        window.open("../pages/subject.html", "__blank");
    };
});
var notebook_manager = new NotebookManager(document.querySelector(".notebooks_grid"));
chrome.storage.local.get("notebooks", function (res) {
    if (res.notebooks.length == 0)
        return;
    console.log(res.notebooks);
    res.notebooks.data.forEach(function (notebook) {
        notebook_manager.addNotebook(notebook.picture_url, notebook.name, false);
    });
});
// notebook_manager.addNotebook("https://images.unsplash.com/photo-1602928309809-776bf9db8658?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2143&q=80", "Chemistry");
// notebook_manager.addNotebook("https://images.unsplash.com/photo-1541186877-bb5a745edde5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cm9ja2V0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60", "Rocket Science");
// notebook_manager.addNotebook("https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8YXJjaGl0ZWN0dXJlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60", "Architecture");
// notebook_manager.addNotebook("https://images.unsplash.com/photo-1549490349-8643362247b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80", "Art");
document.getElementById("createNotebook").addEventListener("click", function () {
    var name = document.querySelector("#Notebook");
    var image = document.querySelector("#Image");
    if (!name.value || !image.value)
        return;
    notebook_manager.addNotebook(image.value, name.value);
    name.value = "";
    image.value = "";
});
