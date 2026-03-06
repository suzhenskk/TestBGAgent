const STORAGE_KEY = 'todoListDataV1';

class TodoApp {
    constructor() {
        this.todos = [];
        this.filter = 'all';

        this.todoForm = document.getElementById('todoForm');
        this.todoInput = document.getElementById('todoInput');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.totalCount = document.getElementById('totalCount');
        this.activeCount = document.getElementById('activeCount');
        this.completedCount = document.getElementById('completedCount');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.filterButtons = document.querySelectorAll('.filter-btn');

        this.load();
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        this.todoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addTodo(this.todoInput.value);
        });

        this.todoList.addEventListener('click', (event) => {
            const li = event.target.closest('li[data-id]');
            if (!li) return;

            const id = li.dataset.id;
            if (event.target.matches('.delete-btn')) {
                this.deleteTodo(id);
            }

            if (event.target.matches('.toggle')) {
                this.toggleTodo(id);
            }
        });

        this.filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.filter = button.dataset.filter;
                this.filterButtons.forEach((b) => b.classList.remove('active'));
                button.classList.add('active');
                this.render();
            });
        });

        this.clearCompletedBtn.addEventListener('click', () => {
            this.todos = this.todos.filter((todo) => !todo.completed);
            this.save();
            this.render();
        });
    }

    addTodo(text) {
        const title = text.trim();
        if (!title) return;

        this.todos.unshift({
            id: crypto.randomUUID(),
            title,
            completed: false,
            createdAt: new Date().toISOString()
        });

        this.todoInput.value = '';
        this.save();
        this.render();
    }

    toggleTodo(id) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );

        this.save();
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.save();
        this.render();
    }

    getFilteredTodos() {
        if (this.filter === 'active') {
            return this.todos.filter((todo) => !todo.completed);
        }

        if (this.filter === 'completed') {
            return this.todos.filter((todo) => todo.completed);
        }

        return this.todos;
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter((todo) => todo.completed).length;
        const active = total - completed;

        this.totalCount.textContent = `总计：${total}`;
        this.activeCount.textContent = `未完成：${active}`;
        this.completedCount.textContent = `已完成：${completed}`;

        this.clearCompletedBtn.disabled = completed === 0;
    }

    render() {
        const visibleTodos = this.getFilteredTodos();
        this.todoList.innerHTML = '';

        visibleTodos.forEach((todo) => {
            const item = document.createElement('li');
            item.dataset.id = todo.id;
            item.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            item.innerHTML = `
                <label class="todo-label">
                    <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="todo-title">${this.escapeHtml(todo.title)}</span>
                </label>
                <button class="delete-btn" type="button" aria-label="删除任务">删除</button>
            `;
            this.todoList.appendChild(item);
        });

        this.emptyState.style.display = visibleTodos.length === 0 ? 'block' : 'none';
        this.updateStats();
    }

    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
    }

    load() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                this.todos = parsed;
            }
        } catch {
            this.todos = [];
        }
    }

    escapeHtml(value) {
        return value
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
