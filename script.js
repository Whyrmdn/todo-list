let tasks = [];

function addTask() {
  $("#taskModal").modal("show");
}

function submitTask() {
  const taskName = document.getElementById("taskName").value;
  const taskOwner = document.getElementById("taskOwner").value;

  if (taskName && taskOwner) {
    const task = {
      id: tasks.length + 1,
      name: taskName,
      owner: taskOwner,
      status: "new",
    };

    tasks.push(task);
    updateTaskList();
    $("#taskModal").modal("hide");
  }
}

function updateTaskList() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "list-group-item";

    li.innerHTML = `
            <span>
                ${task.name} <small class="text-muted">by ${task.owner}</small>
                <span class="badge badge-info ml-2">${task.status.toUpperCase()}</span>
            </span>
            <span>
                <button class="btn btn-sm btn-success" onclick="completeTask(${
                  task.id
                })">&#10003;</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${
                  task.id
                })">&#10005;</button>
            </span>
        `;

    taskList.appendChild(li);
  });
}

function completeTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.status = "completed";
    }
    return task;
  });
  updateTaskList();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  updateTaskList();
}

function clearTasks() {
  tasks = [];
  updateTaskList();
}
