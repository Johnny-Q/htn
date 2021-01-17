console.log("Background page");

let storage = chrome.storage.local;
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

let default_settings = {
    "notebooks": {
        "last_id": 0,
        "data": [/*{
            "id":"",
            "name":"",
            "picture_url":"",
        }*/]
    },
    "notes": {
        "last_id": 0,
        "data": [/*{
            "id":"",
            "title":"",
            "notebook_id":"",
        }*/]
    },
    "noteTimestamps": {
        "last_id": 0,
        "data": [/*{
            "id": "",
            "notes_id": "",
            "time": "",
        }*/]
    },
    "noteBlocks": {
        "last_id": 0,
        "data": [/*{
            "id": "",
            "notes_id": "",
            "text": "",
        }*/]
    },
    "noteCards": {
        "last_id": 0,
        "data": [/*{
            "id": "",
            "notes_id": "",
            "question": "",
            "answer": ""
        }*/]
    },
    "todos": [],
    "current_link": ""
};

storage.get(null, (res) => {
    //if we are missing any of the settings for any reason, reset the settings
    if (!assertObject(res, Object.keys(default_settings))) {
        storage.set(default_settings);
        console.log("reset settings");
    }
});