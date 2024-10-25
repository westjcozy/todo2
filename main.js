// 1. HTML 요소 가져오기
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");

// 2. 기본 변수 선언
let taskList = [];
let mode = "all";
let filterList = [];

// 3. 랜덤 ID 생성 함수
function randomIdGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// 4. 할 일 추가 함수
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

// 5. 할 일 완료/미완료 토글 함수
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

// 6. 할 일 삭제 함수
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
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

// 7. 필터 함수
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

// 8. 렌더링 함수
function render() {
  let list = mode === "all" ? taskList : filterList;

  let resultHTML = ``;
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
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

// 9. 이벤트 리스너 설정
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") addTask();
});
taskInput.addEventListener("input", function () {
  addButton.disabled = taskInput.value.trim() === "";
});
tabs.forEach((tab) => tab.addEventListener("click", filter));

// 10. 초기 설정
window.onload = function () {
  let firstTab = document.getElementById("all");
  underLine.style.width = firstTab.offsetWidth + "px";
  underLine.style.left = firstTab.offsetLeft + "px";
};
