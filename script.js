const taskInput = document.getElementById("task_input");
const taskForm = document.getElementById("task_form");
const taskList = document.getElementById("task_list");

document.addEventListener("DOMContentLoaded", loadTasks);

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTask();
});

function addTask(taskText = "", completed = false) {
    const task = taskText || taskInput.value.trim();
    if (task === "") {
        alert("Please enter a task");
        return;
    }

    const taskItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-check");
    checkbox.checked = completed;
    taskItem.appendChild(checkbox);

    const taskSpan = document.createElement("span");
    taskSpan.classList.add("task-text");
    taskSpan.textContent = task;
    if (completed) taskSpan.classList.add("completed");
    taskItem.appendChild(taskSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "❌";
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);
    taskInput.value = "";
    saveData();
}

taskList.addEventListener("change", function (event) {
    if (event.target.classList.contains("task-check")) {
        event.target.nextElementSibling.classList.toggle("completed");
        saveData();
    }
});

taskList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    const tasks = [];
    document.querySelectorAll("#task_list li").forEach((taskItem) => {
        tasks.push({
            text: taskItem.querySelector(".task-text").textContent,
            completed: taskItem.querySelector(".task-check").checked,
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTask(task.text, task.completed));
}