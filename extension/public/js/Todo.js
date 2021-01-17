/**
 * @description the collection of html elements in the todo list page
 */
var Todo = /** @class */ (function () {
    function Todo(video_url, title, number) {
        var _this = this;
        //create the html
        this.video_url = video_url;
        this.title = title;
        this.number = number;
        var todoDiv = createElement("div", ["newVideo", "col"]);
        todoDiv.append(createElement("hr"));
        var row = createElement("div", ["row"]);
        var numDiv = createElement("div", ["nums", "col-2"]);
        var numP = createElement("p", [], make2Digits(number));
        numDiv.append(numP);
        var descDiv = createElement("div", ["col-10"]);
        var descP = createElement("p", [], title);
        descDiv.append(descP);
        var optionsDiv = createElement("div", ["btn-group", "hidden", "optionsDiv"]);
        var open = createElement("button", ["btn", "btn-light"]);
        open.onclick = function () {
            var url = "";
            if (_this.video_url.indexOf("https://") == -1)
                url += "https://";
            url += _this.video_url;
            //also set the active video url
            window.open(url);
        };
        var complete = createElement("button", ["btn", "btn-success"]);
        var del = createElement("button", ["btn", "btn-danger"]);
        optionsDiv.append(open, complete, del);
        row.append(numDiv, descDiv, optionsDiv);
        todoDiv.append(row);
        this.todoDiv = todoDiv;
        //on hover, show the menu options
        todoDiv.addEventListener("mouseenter", function () {
            optionsDiv.classList.remove("hidden");
        });
        todoDiv.addEventListener("mouseleave", function () {
            optionsDiv.classList.add("hidden");
        });
    }
    Todo.prototype.updateNumber = function (number) {
        this.todoDiv.querySelector(".nums").innerText = make2Digits(number);
        this.number = number;
    };
    return Todo;
}());
var TodoManager = /** @class */ (function () {
    function TodoManager(listContainer, addModal) {
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
    TodoManager.prototype.addTodo = function (video_url, description) {
        var _this = this;
        var todoObj = new Todo(video_url, description, this.todoList.length + 1);
        this.todoList.push(todoObj);
        this.listContainer.append(todoObj.todoDiv);
        chrome.storage.local.set({ "current_link": this.todoList[0].video_url });
        todoObj.todoDiv.querySelector(".btn-success").onclick = function () {
            _this.removeTodo(todoObj.number);
            _this.updateNumbers();
            chrome.storage.local.set({ "todos": _this.exportTodos() });
        };
        todoObj.todoDiv.querySelector(".btn-danger").onclick = function () {
            _this.removeTodo(todoObj.number);
            _this.updateNumbers();
            chrome.storage.local.set({ "todos": _this.exportTodos() });
        };
        chrome.storage.local.set({ "todos": this.exportTodos() });
    };
    //if(this.todoList[0].completed == true) removeElement(0);
    //splice (index, number of ele's to remove)
    TodoManager.prototype.removeTodo = function (index) {
        this.todoList[index - 1].todoDiv.remove();
        this.todoList.splice(index - 1, 1);
        //clear the url
        if (this.todoList.length == 0) {
            chrome.storage.local.set({ "current_link": "" });
        }
    };
    TodoManager.prototype.markCompleted = function (index) {
        this.todoList[index - 1].completed = true;
    };
    TodoManager.prototype.updateNumbers = function () {
        if (this.todoList.length == 0)
            return;
        chrome.storage.local.set({ "current_link": this.todoList[0].video_url });
        for (var i = 0; i < this.todoList.length; i++) {
            this.todoList[i].updateNumber(i + 1);
        }
    };
    TodoManager.prototype.exportTodos = function () {
        var temp = [];
        this.todoList.forEach(function (todo) {
            temp.push({ "video_url": todo.video_url, "title": todo.title });
        });
        return temp;
    };
    return TodoManager;
}());
var manager = new TodoManager(document.querySelector(".listContainer"), document.querySelector(".addModal"));
chrome.storage.local.get("todos", function (res) {
    // res.todos.forEach(todo=>{
    //     manager.addTodo
    // })
    console.log(res.todos);
    res.todos.forEach(function (todo) {
        manager.addTodo(todo.video_url, todo.title);
    });
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
document.querySelector(".addVideoButton").onclick = function () {
    var vLink = document.querySelector("#vLink");
    var vTitle = document.querySelector("#vTitle");
    if (!vLink.value || !vTitle.value)
        return;
    manager.addTodo(vLink.value, vTitle.value);
    vLink.value = "";
    vTitle.value = "";
};
