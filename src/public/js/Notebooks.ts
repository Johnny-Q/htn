/**
 * Notebook
 *      list of notes
 *          video
 *          flashcards
 */
class Note {
    flashcardList:Array<Flashcard>;

    constructor(){
        
    }
    addVideo(){
        let v_url, v_name;
        let videoObj = new Video(v_url, v_name);
    }
    
    addFlashcard(){
        let ques, ans;
        let card = new Flashcard(ques, ans)
        this.flashcardList.push(card);
    }
    deleteFlashCard(index){
        this.flashcardList.splice(index,1);
    }
}

class Notebook{
    pic_url:string;
    name:string;
    notesList:Array<Note>;
    constructor(pic_url, name){
        this.pic_url = pic_url; 
        this.name = name; 
    }
    
    addNote(){
        let n = new Note();
        this.notesList.push(n);
    }
    deleteNote(index){
        this.notesList.splice(index, 1);
    }
    viewNote(){
        
    }
}

class NotebookManager{
    notebookList:Array<Notebook>;
    
    constructor(){

    }
    addNotebook(){
        let picture_url, name;
        let nBook = new Notebook(picture_url, name);
        this.notebookList.push(nBook);
    }
    deleteNoteBook(index){
        this.notebookList.splice(index,1);
    }
}

document.querySelectorAll(".notebook").forEach(notebook=>{
    notebook.onclick = ()=>{
        window.open("../pages/subject.html", "__blank");
    };
});


document.getElementById("addNotebook").addEventListener("click", ()=>{
    NotebookManager.addNotebook();
});
