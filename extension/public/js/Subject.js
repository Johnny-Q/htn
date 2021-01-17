chrome.storage.local.get("notes", function (res) {
    if (!("notes" in res))
        return;
    var params = new URLSearchParams(window.location.search);
    var notebook_id = params.get("notebook_id");
    var temp = [];
    res.notes.data.forEach(function (note) {
        if (note.notebook_id == notebook_id) {
            temp.push(note);
        }
    });
    console.log(temp);
});
