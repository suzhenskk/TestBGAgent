// Core Todo app logic (framework-free).
export class TodoApp {
  /**
   * @param {object} opts
   * @param {Storage} [opts.storage]
   * @param {string} [opts.storageKey]
   */
  constructor({ storage = window.localStorage, storageKey = "todos" } = {}) {
    this.storage = storage;
    this.storageKey = storageKey;

    this.todos = this.#loadTodos();

    this.todoInput = document.getElementById("todoInput");
    this.addBtn = document.getElementById("addBtn");
    this.todoList = document.getElementById("todoList");
    this.todoCount = document.getElementById("todoCount");
    this.completedCount = document.getElementById("completedCount");
    this.emptyState = document.getElementById("emptyState");

    if (
      !this.todoInput ||
      !this.addBtn ||
      !this.todoList ||
      !this.todoCount ||
      !this.completedCount ||
      !this.emptyState
    ) {
      throw new Error("TodoApp: missing required DOM elements");
    }

    this.init();
  }

  init() {
    this.#bindEvents();
    this.renderTodos();
    this.updateStats();
    this.toggleEmptyState();
  }

  #bindEvents() {
    // Add button click.
    this.addBtn.addEventListener("click", () => this.addTodo());

    // Input enter key.
    this.todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTodo();
    });

    // Input focus effects.
    this.todoInput.addEventListener("focus", () => {
      const wrapper = this.todoInput.parentElement;
      if (wrapper) wrapper.style.transform = "scale(1.02)";
    });

    this.todoInput.addEventListener("blur", () => {
      const wrapper = this.todoInput.parentElement;
      if (wrapper) wrapper.style.transform = "scale(1)";
    });

    // Todo list event delegation (replaces inline onclick handlers).
    this.todoList.addEventListener("click", (e) => {
      const target = /** @type {HTMLElement | null} */ (e.target);
      if (!target) return;

      const actionEl = target.closest("[data-action]");
      if (!actionEl) return;

      const action = actionEl.getAttribute("data-action");
      const id = Number(actionEl.getAttribute("data-id"));
      if (!Number.isFinite(id)) return;

      if (action === "toggle") this.toggleTodo(id);
      if (action === "delete") this.deleteTodo(id);
    });
  }

  addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) {
      this.shakeInput();
      return;
    }

    const todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.todos.unshift(todo);
    this.#saveTodos();
    this.renderTodos();
    this.updateStats();
    this.toggleEmptyState();

    this.todoInput.value = "";
    this.todoInput.focus();

    // Add button feedback.
    this.addBtn.style.transform = "scale(0.9)";
    window.setTimeout(() => {
      this.addBtn.style.transform = "scale(1)";
    }, 150);
  }

  deleteTodo(id) {
    const todoElement = this.todoList.querySelector(`[data-row-id="${id}"]`);
    if (!todoElement) return;

    todoElement.classList.add("removing");
    window.setTimeout(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.#saveTodos();
      this.renderTodos();
      this.updateStats();
      this.toggleEmptyState();
    }, 400);
  }

  toggleTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return;

    todo.completed = !todo.completed;
    this.#saveTodos();
    this.updateStats();

    const todoElement = this.todoList.querySelector(`[data-row-id="${id}"]`);
    if (!todoElement) return;

    const checkbox = todoElement.querySelector(".todo-checkbox");
    if (todo.completed) {
      todoElement.classList.add("completed");
      checkbox?.classList.add("checked");
    } else {
      todoElement.classList.remove("completed");
      checkbox?.classList.remove("checked");
    }
  }

  renderTodos() {
    this.todoList.innerHTML = "";

    this.todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = `todo-item ${todo.completed ? "completed" : ""}`;
      li.setAttribute("data-row-id", String(todo.id));

      // Stagger animation.
      li.style.animationDelay = `${index * 0.1}s`;

      const checkbox = document.createElement("div");
      checkbox.className = `todo-checkbox ${todo.completed ? "checked" : ""}`;
      checkbox.setAttribute("data-action", "toggle");
      checkbox.setAttribute("data-id", String(todo.id));
      checkbox.setAttribute("role", "checkbox");
      checkbox.setAttribute("aria-checked", todo.completed ? "true" : "false");
      checkbox.tabIndex = 0;

      const text = document.createElement("span");
      text.className = "todo-text";
      text.textContent = todo.text; // safe: avoids HTML injection

      const del = document.createElement("button");
      del.className = "todo-delete";
      del.type = "button";
      del.textContent = "×";
      del.setAttribute("aria-label", "删除任务");
      del.setAttribute("data-action", "delete");
      del.setAttribute("data-id", String(todo.id));

      li.appendChild(checkbox);
      li.appendChild(text);
      li.appendChild(del);

      this.todoList.appendChild(li);
    });
  }

  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter((t) => t.completed).length;

    this.todoCount.textContent = `${total} 个任务`;
    this.completedCount.textContent = `${completed} 个已完成`;

    this.#animateNumber(this.todoCount, total);
    this.#animateNumber(this.completedCount, completed);
  }

  #animateNumber(element, newValue) {
    const currentText = element.textContent || "";
    const match = currentText.match(/\d+/);
    const currentNumber = match ? Number(match[0]) : 0;

    if (currentNumber !== newValue) {
      element.style.transform = "scale(1.2)";
      element.style.color = newValue > currentNumber ? "#4caf50" : "#ff4757";

      window.setTimeout(() => {
        element.style.transform = "scale(1)";
        element.style.color = "";
      }, 300);
    }
  }

  toggleEmptyState() {
    if (this.todos.length === 0) {
      this.emptyState.classList.add("show");
      this.todoList.style.display = "none";
    } else {
      this.emptyState.classList.remove("show");
      this.todoList.style.display = "block";
    }
  }

  shakeInput() {
    this.todoInput.style.animation = "shake 0.5s ease-in-out";
    this.todoInput.style.borderColor = "#ff4757";

    window.setTimeout(() => {
      this.todoInput.style.animation = "";
      this.todoInput.style.borderColor = "";
    }, 500);
  }

  addMany(texts) {
    const now = Date.now();
    texts.forEach((text, idx) => {
      this.todos.push({
        id: now + idx + Math.random(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
      });
    });

    this.#saveTodos();
    this.renderTodos();
    this.updateStats();
    this.toggleEmptyState();
  }

  #loadTodos() {
    try {
      const raw = this.storage.getItem(this.storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  #saveTodos() {
    this.storage.setItem(this.storageKey, JSON.stringify(this.todos));
  }
}
