// dom 요소 가져오기
const input = document.querySelector(".todo-input");
const addBtn = document.querySelector(".write");
const beforeBox = document.querySelector(".before");
const afterBox = document.querySelector(".after");

// 로컬스토리지에서 기존 값 불러오기
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 화면 랜더링
function renderTodos() {
  beforeBox.querySelectorAll(".todo").forEach((el) => el.remove());
  afterBox.querySelectorAll(".todo").forEach((el) => el.remove());

  todos.forEach((item, index) => {
    const task = document.createElement("div");
    task.className = "todo";

    task.style.display = "flex";
    task.style.justifyContent = "space-between";
    task.style.alignItems = "center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.isDone;

    const span = document.createElement("span");
    span.textContent = item.text;
    span.style.marginLeft = "5px";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.style.border = "none";
    deleteBtn.style.background = "none";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1); // 배열에서 삭제
      saveTodos(); // 저장
      renderTodos(); // 다시 렌더링
    });

    task.appendChild(checkbox);
    task.appendChild(span);
    task.appendChild(deleteBtn);

    checkbox.addEventListener("change", () => {
      todos[index].isDone = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    if (item.isDone) {
      afterBox.appendChild(task);
    } else {
      beforeBox.appendChild(task);
    }
  });
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 작성하기 버튼 클릭 시
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  todos.push({ text, isDone: false });
  input.value = "";
  saveTodos();
  renderTodos();
});

// 초기 렌더링
renderTodos();
