document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    // Listen for "Enter" key press in input field
    document.getElementById("task").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});

function addTask() {
    let taskInput = document.getElementById("task");
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    addTaskToDOM(taskText);
    saveTasks();

    taskInput.value = "";
}

function addTaskToDOM(taskText, isLoaded = false) {
    let todoList = document.getElementById("todo-list");

    // Prevent duplicate entries when loading or adding manually
    if ([...todoList.children].some(li => li.dataset.task === taskText)) {
        return;
    }

    let li = document.createElement("li");
    li.textContent = taskText;
    li.dataset.task = taskText; // Store task in dataset to prevent duplicates

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = function() {
        li.remove();
        saveTasks(); // Save before removing to prevent incorrect data
    };

    li.appendChild(removeBtn);
    todoList.appendChild(li);
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        tasks.push(li.dataset.task);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskText => addTaskToDOM(taskText, true));
}
