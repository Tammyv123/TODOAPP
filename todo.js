// DOM Elements
const addButton = document.getElementById("add-button");
const todoInput = document.getElementById("todo-input");
const deleteAllButton = document.getElementById("delete-all");
const deleteSelectedButton = document.getElementById("delete-selected");
const allTodos = document.getElementById("all-todos");

// Todo List Arrays
let todoList = [];

// Event Listeners
addButton.addEventListener("click", addTodo);
deleteAllButton.addEventListener("click", deleteAllTodos);
deleteSelectedButton.addEventListener("click", deleteCompletedTodos);

todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
});

allTodos.addEventListener("click", handleTodoAction);

document.getElementById("all").addEventListener("click", () => renderTodos(todoList));
document.getElementById("rem").addEventListener("click", () => renderTodos(getRemainingTodos()));
document.getElementById("com").addEventListener("click", () => renderTodos(getCompletedTodos()));

// Functions
function addTodo() {
    const task = todoInput.value.trim();

    if (!task) {
        alert("😮 Task cannot be empty");
        return;
    }

    const newTodo = {
        id: Date.now().toString(),
        task,
        complete: false,
    };

    todoList.push(newTodo);
    todoInput.value = "";

    updateStats();
    renderTodos(todoList);
}

function handleTodoAction(event) {
    const target = event.target;
    const todoItem = target.closest(".todo-item");

    if (!todoItem) return;

    const todoId = todoItem.id;

    if (target.classList.contains("complete") || target.classList.contains("ci")) {
        toggleTodoCompletion(todoId);
    } else if (target.classList.contains("delete") || target.classList.contains("di")) {
        deleteTodoById(todoId);
    }
}

function toggleTodoCompletion(todoId) {
    todoList = todoList.map((todo) =>
        todo.id === todoId ? { ...todo, complete: !todo.complete } : todo
    );

    updateStats();
    renderTodos(todoList);
}

function deleteTodoById(todoId) {
    todoList = todoList.filter((todo) => todo.id !== todoId);

    updateStats();
    renderTodos(todoList);
}

function deleteAllTodos() {
    if (!confirm("Are you sure you want to delete all todos?")) return;

    todoList = [];
    updateStats();
    renderTodos(todoList);
}

function deleteCompletedTodos() {
    if (!confirm("Are you sure you want to delete completed todos?")) return;

    todoList = getRemainingTodos();
    updateStats();
    renderTodos(todoList);
}

function getCompletedTodos() {
    return todoList.filter((todo) => todo.complete);
}

function getRemainingTodos() {
    return todoList.filter((todo) => !todo.complete);
}

function updateStats() {
    const completedCount = getCompletedTodos().length;
    const totalCount = todoList.length;

    document.getElementById("c-count").innerText = completedCount;
    document.getElementById("r-count").innerText = totalCount;
}

function renderTodos(todos) {
    allTodos.innerHTML = todos
        .map(
            (todo) => `
        <li id="${todo.id}" class="todo-item">
            <p id="task" class="${todo.complete ? "line" : ""}">${todo.task}</p>
            <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class="ci bx bx-check bx-sm"></i>
                </button>
                <button class="delete btn btn-error">
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`
        )
        .join("");
}

// Initial Stats Update
updateStats();
