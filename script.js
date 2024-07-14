document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("tasks")) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    }
});

function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    addTaskToDOM(taskText, false);
    saveTask(taskText, false);
    taskInput.value = "";
}

function addTaskToDOM(taskText, completed) {
    const taskList = document.getElementById("task-list");

    const li = document.createElement("li");
    li.textContent = taskText;
    li.className = completed ? "completed" : "";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = () => {
        taskList.removeChild(li);
        removeTask(taskText);
    };

    li.onclick = () => {
        li.classList.toggle("completed");
        updateTask(taskText, li.classList.contains("completed"));
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function saveTask(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push({ text: taskText, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const task = tasks.find(task => task.text === taskText);
    if (task) {
        task.completed = completed;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks(filter) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    tasks.forEach(task => {
        if (filter === "all" || (filter === "completed" && task.completed) || (filter === "incomplete" && !task.completed)) {
            addTaskToDOM(task.text, task.completed);
        }
    });
}

function deleteAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        localStorage.removeItem("tasks");
        document.getElementById("task-list").innerHTML = "";
    }
}
