let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];
let underLine = document.getElementById("under-line");

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

taskInput.addEventListener("input", function () {
  if (taskInput.value.trim() === "") {
    addButton.disabled = true;
  } else {
    addButton.disabled = false;
  }
});

function addTask() {
  let taskContent = taskInput.value.trim();

  if (taskContent === "") {
    alert("Enter todo");
    return;
  }
  taskList.push({
    id: randomIdGenerate(),
    taskContent: taskContent,
    isComplete: false,
  });
  render();
  taskInput.value = "";
  addButton.disabled = true;
}

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = ``;
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                  <button onclick="toggleComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
                  <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
                </div>
              </div>`;
    } else {
      resultHTML += `<div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                  <button onclick="toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
                  <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
                </div>
              </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  // taskList에서 해당 아이템 삭제
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1); // 리스트에서 삭제
      break;
    }
  }

  // 현재 모드에 맞게 필터링된 리스트를 다시 렌더링
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    filterList = taskList.filter((task) => task.isComplete === false);
    render();
  } else if (mode === "done") {
    filterList = taskList.filter((task) => task.isComplete === true);
    render();
  }
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  underLine.style.width = event.target.offsetWidth + "px";
  underLine.style.left = event.target.offsetLeft + "px";
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    filterList = taskList.filter((task) => task.isComplete === false);
    render();
  } else if (mode === "done") {
    filterList = taskList.filter((task) => task.isComplete === true);
    render();
  }
}

window.onload = function () {
  let firstTab = document.getElementById("all");
  underLine.style.width = firstTab.offsetWidth + "px";
  underLine.style.left = firstTab.offsetLeft + "px";
};

function randomIdGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
