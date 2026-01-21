class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.editingId = null;

        this.init();
    }

    init() {
        this.loadTodos();
        this.setupEventListeners();
        this.renderTodos();
        this.updateStats();
    }

    setupEventListeners() {
        // Add todo
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Clear completed
        document.getElementById('clearCompletedBtn').addEventListener('click', () => this.clearCompleted());
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (text === '') return;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.push(todo);
        this.saveTodos();
        this.renderTodos();
        this.updateStats();

        input.value = '';
        input.focus();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
        }
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        this.editingId = id;
        this.renderTodos();
    }

    saveEdit(id, newText) {
        const todo = this.todos.find(t => t.id === id);
        if (todo && newText.trim() !== '') {
            todo.text = newText.trim();
            this.saveTodos();
        }
        this.editingId = null;
        this.renderTodos();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.renderTodos();
        this.updateStats();
    }

    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.saveTodos();
        this.renderTodos();
        this.updateStats();
    }

    setFilter(filter) {
        this.currentFilter = filter;

        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        this.renderTodos();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    renderTodos() {
        const todoList = document.getElementById('todoList');
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            todoList.innerHTML = `
                <div class="empty-state">
                    <h3>${this.getEmptyStateMessage()}</h3>
                    <p>${this.getEmptyStateSubtext()}</p>
                </div>
            `;
            return;
        }

        todoList.innerHTML = filteredTodos.map(todo => `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input type="checkbox"
                       class="todo-checkbox"
                       ${todo.completed ? 'checked' : ''}
                       onchange="app.toggleTodo(${todo.id})">

                <span class="todo-text ${this.editingId === todo.id ? 'editing' : ''}"
                      onclick="app.editTodo(${todo.id})">
                    ${this.escapeHtml(todo.text)}
                </span>

                <input type="text"
                       class="todo-edit-input ${this.editingId === todo.id ? 'editing' : ''}"
                       value="${this.escapeHtml(todo.text)}"
                       onkeypress="app.handleEditKeypress(event, ${todo.id})"
                       onblur="app.saveEdit(${todo.id}, this.value)">

                <div class="todo-actions">
                    <button class="edit-btn" onclick="app.editTodo(${todo.id})">✏️</button>
                    <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    handleEditKeypress(event, id) {
        if (event.key === 'Enter') {
            this.saveEdit(id, event.target.value);
        } else if (event.key === 'Escape') {
            this.editingId = null;
            this.renderTodos();
        }
    }

    updateStats() {
        const total = this.todos.length;
        const active = this.todos.filter(t => !t.completed).length;
        const completed = this.todos.filter(t => t.completed).length;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('activeTasks').textContent = active;
        document.getElementById('completedTasks').textContent = completed;

        // Update clear completed button visibility
        document.getElementById('clearCompletedBtn').style.display =
            completed > 0 ? 'inline-block' : 'none';
    }

    getEmptyStateMessage() {
        switch (this.currentFilter) {
            case 'active':
                return 'No active tasks';
            case 'completed':
                return 'No completed tasks';
            default:
                return 'No tasks yet';
        }
    }

    getEmptyStateSubtext() {
        switch (this.currentFilter) {
            case 'active':
                return 'Great job! All tasks are completed.';
            case 'completed':
                return 'Complete some tasks to see them here.';
            default:
                return 'Add your first task above to get started!';
        }
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        const saved = localStorage.getItem('todos');
        if (saved) {
            this.todos = JSON.parse(saved);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
const app = new TodoApp();

// Make app globally available for onclick handlers
window.app = app;