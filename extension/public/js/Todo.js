var Todo = /** @class */ (function () {
    function Todo(video_url, description, completed) {
        this.video_url = video_url;
        this.description = description;
        this.completed = completed;
    }
    return Todo;
}());
var TodoManager = /** @class */ (function () {
    function TodoManager() {
    }
    TodoManager.prototype.addElement = function () {
        var temp1, temp2, temp3;
        var todoObj = new Todo(temp1, temp2, temp3);
        this.todoList.push(todoObj);
    };
    //if(this.todoList[0].completed == true) removeElement(0);
    //splice (index, number of ele's to remove)
    TodoManager.prototype.removeElement = function (index) {
        this.todoList.splice(index, 1);
    };
    TodoManager.prototype.markCompleted = function (index) {
        this.todoList[index].completed = true;
    };
    return TodoManager;
}());
