class Todo {
    video_url: string;
    description: string;
    completed: boolean;
    constructor(video_url, description, completed) {
        this.video_url = video_url;
        this.description = description;
        this.completed = completed;
    }
}

class TodoManager {
    todoList: Array<Todo>;
    constructor(){
        
    }

    addElement() {
        let temp1, temp2, temp3;
        let todoObj = new Todo(temp1, temp2, temp3);
        this.todoList.push(todoObj);
    }
    
    //if(this.todoList[0].completed == true) removeElement(0);
    //splice (index, number of ele's to remove)
    removeElement(index){
         this.todoList.splice(index,1);
    }
    markCompleted(index) {
        this.todoList[index].completed = true;
    }
}