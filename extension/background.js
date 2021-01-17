console.log("Background page");
var storage = chrome.storage.local;
/*
{
    "notebooks": [
        {
            "name":"",
            "image_url": "",
            "notesList":[{
                "title":""
                "timestamps":[],
                "noteBlocks":[],
                "flashcardsList":[]
            }]
        },
    ],
    "todos": [],
    "current_link":""
}
*/
var default_settings = {
    "notebooks": {
        "last_id": 0,
        "data": [ /*{
            "id":"",
            "name":"",
            "picture_url":"",
        }*/]
    },
    "notes": {
        "last_id": 0,
        "data": [ /*{
            "id":"",
            "title":"",
            "notebook_id":"",
        }*/]
    },
    "noteData": {
        "last_id": 0,
        "data": [ /*{
            "id":"",
            "notes_id":"",
            "timestamp":"",
            "text":""
        }*/]
    },
    "noteCards": {
        "last_id": 0,
        "data": [{
                "id": "",
                "notes_id": "",
                "question": "",
                "answer": ""
            }]
    },
    "todos": [],
    "current_link": ""
};
storage.get(null, function (res) {
    //if we are missing any of the settings for any reason, reset the settings
    if (!assertObject(res, Object.keys(default_settings))) {
        storage.set(default_settings);
        console.log("reset settings");
    }
});
