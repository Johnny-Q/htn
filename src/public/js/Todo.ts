/**
 * @description the collection of html elements in the todo list page
 */
class Todo {
    video_url: string;
    title: string;
    completed: boolean;
    id: number
    todoDiv;
    number: number;
    constructor(video_url: string, title, number) {
        //create the html
        this.video_url = video_url;
        this.title = title;
        this.number = number;

        let todoDiv = createElement("div", ["newVideo", "col"]);
        todoDiv.append(createElement("hr"));

        let row = createElement("div", ["row"]);
        let numDiv = createElement("div", ["nums", "col-2"]);
        let numP = createElement("p", [], make2Digits(number));
        numDiv.append(numP);

        let descDiv = createElement("div", ["col-10"]);
        let descP = createElement("p", [], title);
        descDiv.append(descP);

        let optionsDiv = createElement("div", ["btn-group", "hidden", "optionsDiv"]);
        let open = createElement("button", ["btn", "btn-light"]);
        open.onclick = () => {
            let url = "";
            if (this.video_url.indexOf("https://") == -1) url += "https://"
            url += this.video_url;

            //also set the active video url

            window.open(url);
        };
        let complete = createElement("button", ["btn", "btn-success"]);
        let del = createElement("button", ["btn", "btn-danger"]);
        optionsDiv.append(open, complete, del);

        row.append(numDiv, descDiv, optionsDiv)

        todoDiv.append(row);
        this.todoDiv = todoDiv;


        //on hover, show the menu options
        todoDiv.addEventListener("mouseenter", () => {
            optionsDiv.classList.remove("hidden");
        });
        todoDiv.addEventListener("mouseleave", () => {
            optionsDiv.classList.add("hidden");
        });
    }

    updateNumber(number: number) {
        this.todoDiv.querySelector(".nums").innerText = make2Digits(number);
        this.number = number;
    }
}

class TodoManager {
    todoList: Array<Todo>;
    listContainer;
    addModal;
    constructor(listContainer, addModal) {
        this.listContainer = listContainer;
        this.addModal = addModal;
        this.todoList = [];
    }

    // renderTodo(todo: Todo, number){
    //     let todoDiv = createElement("div", ["newVideo", "col"]);
    //     todoDiv.append(createElement("hr"));

    //     let row = createElement("div", ["row"]);
    //     let num = createElement("div", ["nums", "col-2"], number);
    //     let desc = createElement("div", ["col-10"], todo.description);

    //     let optionsDiv = createElement("div", ["btn-group", "hidden", "row"]);
    //     let complete = createElement("button", ["btn", "btn-success"]);
    //     optionsDiv.append(complete);

    //     todoDiv.append(row, num, desc, optionsDiv);
    //     this.listContainer.append(todoDiv);
    // }
    addTodo(video_url, description) {
        let todoObj = new Todo(video_url, description, this.todoList.length + 1);
        this.todoList.push(todoObj);
        this.listContainer.append(todoObj.todoDiv);

        chrome.storage.local.set({ "current_link": this.todoList[0].video_url });

        todoObj.todoDiv.querySelector(".btn-success").onclick = () => {
            this.removeTodo(todoObj.number);
            this.updateNumbers();
            chrome.storage.local.set({ "todos": this.exportTodos() });
        }
        todoObj.todoDiv.querySelector(".btn-danger").onclick = () => {
            this.removeTodo(todoObj.number);
            this.updateNumbers();
            chrome.storage.local.set({ "todos": this.exportTodos() });
        }

        chrome.storage.local.set({ "todos": this.exportTodos() });
    }

    //if(this.todoList[0].completed == true) removeElement(0);
    //splice (index, number of ele's to remove)
    removeTodo(index) {
        this.todoList[index - 1].todoDiv.remove();
        this.todoList.splice(index - 1, 1);
        //clear the url
        if (this.todoList.length == 0) {
            chrome.storage.local.set({ "current_link": "" });
        }
    }
    markCompleted(index) {
        this.todoList[index - 1].completed = true;
    }

    updateNumbers() {
        if (this.todoList.length == 0) return;
        chrome.storage.local.set({ "current_link": this.todoList[0].video_url });
        for (let i = 0; i < this.todoList.length; i++) {
            this.todoList[i].updateNumber(i + 1);
        }
    }

    exportTodos() {
        let temp = [];
        this.todoList.forEach(todo => {
            temp.push({ "video_url": todo.video_url, "title": todo.title });
        });
        return temp;
    }
}

let manager = new TodoManager(document.querySelector(".listContainer"), document.querySelector(".addModal"));
chrome.storage.local.get("todos", (res) => {
    // res.todos.forEach(todo=>{
    //     manager.addTodo
    // })
    console.log(res.todos);
    res.todos.forEach(todo => {
        manager.addTodo(todo.video_url, todo.title);
    })
});
// manager.addTodo("youtube.com", "alskdjfaslkdfjk");
// manager.addTodo("asdf", "daflkdjfaldjlfajd");
// manager.addTodo("asdf", "die");
// manager.addTodo("asdf", "aslkdfjasldfjaslkfjawekl");

// document.querySelectorAll(".addnewvideo").forEach(button => {
//     button.onclick = () => {
//         manager.showAddModal();
//     };
// });

document.querySelector(".addVideoButton").onclick = () => {
    let vLink = document.querySelector("#vLink");
    let vTitle = document.querySelector("#vTitle");

    if (!vLink.value || !vTitle.value) return;

    manager.addTodo(vLink.value, vTitle.value);

    vLink.value = "";
    vTitle.value = "";
}
