document.addEventListener("DOMContentLoaded", function () {

  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  let tasks = [];

  function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(taskText => addTask(taskText, false));
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTask(taskText, save = true) {
    
    if (typeof taskText !== "string") {
      taskText = taskInput.value.trim();
    } else {
      taskText = taskText.trim();
    }

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    removeButton.onclick = function () {
      taskList.removeChild(li);
      
      const index = tasks.indexOf(taskText);
      if (index > -1) {
        tasks.splice(index, 1);
        saveTasks();
      }
    };

    
    li.appendChild(removeButton);

    
    taskList.appendChild(li);

    if (save) {
      tasks.push(taskText);
      saveTasks();
    }

    if (typeof taskText !== "string" || taskText === taskInput.value.trim()) {
      taskInput.value = "";
    }
  }

  addButton.addEventListener("click", function () {
    addTask(); 
  });

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask(); 
    }
  });

  loadTasks();
});
