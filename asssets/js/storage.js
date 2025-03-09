/*  function addTask() {
            let taskInput = document.getElementById("task");
            let taskText = taskInput.value.trim();

            if (taskText === "") return;

            let li = document.createElement("li");
            li.textContent = taskText;

            let removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.onclick = function() {
                li.remove();
            };

            li.appendChild(removeBtn);
            document.getElementById("todo-list").appendChild(li);
            taskInput.value = "";
        } */
// Load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(addTaskToDOM);
}

// Save tasks to local storage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        tasks.push(li.textContent.replace("Remove", "").trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
