# htn
Chat Bot

## PAGES TO DESIGN
Popup Page
Welcome Page
Documents overview page
**Edit document page**
Todo list page 


Dark mode

autosplit screen


chrome storage
{
    "notebooks":{
        "last_id":0,
        "data":[{
            "id":"",
            "name":"",
            "picture_url":"",
        }]
    },
    "notes":{
        "last_id":0,
        "data":[{
            "id":"",
            "title":"",
            "notebook_id":"",
        }]
    },
    "noteData":{
        "last_id": 0,
        "data":[{
            "id":"",
            "notebook_id":"",
            "timestamp":"",
            "text":""
        }]
    },
    "noteCards":{
        "last_id":0,
        "data":[{
            "id":"",
            "notes_id":"",
            "question":"",
            "answer":""
        }]
    }
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

SQL

Accounts
id
email
password

Notebooks
id
account_id
picture_url
name

Notes
id
account_id
notebook_id

NotesTimestamps
id
account_id
notes_id
timestamp

NoteBlocks (BLOB)
id
account_id
notes_id
text



Sessions

