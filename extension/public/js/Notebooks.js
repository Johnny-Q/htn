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
    Note.prototype.deleteFlashCard = function (index) {
        this.flashcardList.splice(index, 1);
    };
    return Note;
}());
var Notebook = /** @class */ (function () {
    function Notebook(pic_url, name) {
        this.pic_url = pic_url;
        this.name = name;
    }
    Notebook.prototype.addNote = function () {
        var n = new Note();
        this.notesList.push(n);
    };
    Notebook.prototype.deleteNote = function (index) {
        this.notesList.splice(index, 1);
    };
    Notebook.prototype.viewNote = function () {
    };
    return Notebook;
}());
var NotebookManager = /** @class */ (function () {
    function NotebookManager() {
    }
    NotebookManager.prototype.addNotebook = function () {
        var picture_url, name;
        var nBook = new Notebook(picture_url, name);
        this.notebookList.push(nBook);
    };
    NotebookManager.prototype.deleteNoteBook = function (index) {
        this.notebookList.splice(index, 1);
    };
    return NotebookManager;
}());
document.querySelectorAll(".notebook").forEach(function (notebook) {
    notebook.onclick = function () {
        window.open("../pages/subject.html", "__blank");
    };
});
document.getElementById("addNotebook").addEventListener("click", function () {
    NotebookManager.addNotebook();
});
