const API_URL = "http://localhost:5000/api/tasks";

let tasks = [];
let currentFilter = "all";
import { renderTaskList } from "./modules/render.js";
import { validateTaskInput } from "./modules/validation.js";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const filters = document.querySelectorAll("[data-filter]");
const countEl = document.getElementById("task-count");

function createTask(text) {
  return {
    id: Date.now(),
    text: text.trim(),
    completed: false
  };
}

function getFilteredTasks() {
  if (currentFilter === "active") return tasks.filter(t => !t.completed);
  if (currentFilter === "completed") return tasks.filter(t => t.completed);
  return tasks;
}

function updateUI() {
  renderTaskList(list, getFilteredTasks());
  countEl.textContent = `${tasks.length} tasks total`;
}

// ADD TASK
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateTaskInput(input.value)) return;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: input.value })
  });

  input.value = "";
  fetchTasks(); // refresh from server
});
// DELETE + TOGGLE (EVENT DELEGATION)
list.addEventListener("click", async (e) => {
  const li = e.target.closest(".task");
  if (!li) return;

  const id = Number(li.dataset.id);

  // DELETE
  if (e.target.classList.contains("delete-btn")) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    fetchTasks();
  }

  // TOGGLE
  if (e.target.type === "checkbox") {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ completed: e.target.checked })
    });

    fetchTasks();
  }
});
// FILTERS
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    updateUI();
  });
});

// INITIAL LOAD
fetchTasks();
async function fetchTasks() {
  const res = await fetch(API_URL);
  tasks = await res.json();
  updateUI();
}
app.use(cors());