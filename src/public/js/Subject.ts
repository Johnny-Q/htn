chrome.storage.local.get("notes", (res)=>{
    if(!("notes" in res)) return;
    let params = new URLSearchParams(window.location.search);
    let notebook_id = params.get("notebook_id");
    let temp = [];
    res.notes.data.forEach(note=>{
        if(note.notebook_id == notebook_id){
            temp.push(note);
        }
    });
    console.log(temp);
});