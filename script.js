const STORAGE_KEY = 'todoListData';

const state = {
    todos: [],
    filter: 'all'
};

const elements = {
    form: document.getElementById('todoForm'),
    input: document.getElementById('todoInput'),
    list: document.getElementById('todoList'),
    emptyState: document.getElementById('emptyState'),
    totalCount: document.getElementById('totalCount'),
    remainingCount: document.getElementById('remainingCount'),
    completedCount: document.getElementById('completedCount'),
    clearCompleted: document.getElementById('clearCompleted'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    todayDate: document.getElementById('todayDate')
};

const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString('zh-CN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const saveTodos = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
};

const loadTodos = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        state.todos = JSON.parse(saved);
    }
};

const addTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    state.todos.unshift({
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: new Date().toISOString()
    });
    saveTodos();
    render();
};

const toggleTodo = (id) => {
    state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    render();
};

const removeTodo = (id) => {
    state.todos = state.todos.filter((todo) => todo.id !== id);
    saveTodos();
    render();
};

const clearCompleted = () => {
    state.todos = state.todos.filter((todo) => !todo.completed);
    saveTodos();
    render();
};

const setFilter = (filter) => {
    state.filter = filter;
    elements.filterButtons.forEach((button) => {
        button.classList.toggle('is-active', button.dataset.filter === filter);
    });
    render();
};

const getFilteredTodos = () => {
    if (state.filter === 'active') {
        return state.todos.filter((todo) => !todo.completed);
    }
    if (state.filter === 'completed') {
        return state.todos.filter((todo) => todo.completed);
    }
    return state.todos;
};

const updateStats = () => {
    const total = state.todos.length;
    const completed = state.todos.filter((todo) => todo.completed).length;
    const remaining = total - completed;

    elements.totalCount.textContent = total;
    elements.completedCount.textContent = completed;
    elements.remainingCount.textContent = remaining;
};

const renderTodos = () => {
    const filtered = getFilteredTodos();
    elements.list.innerHTML = '';

    if (filtered.length === 0) {
        elements.emptyState.classList.remove('hidden');
        return;
    }

    elements.emptyState.classList.add('hidden');

    filtered.forEach((todo) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'is-completed' : ''}`;

        li.innerHTML = `
            <label class="todo-main">
                <input class="todo-checkbox" type="checkbox" ${todo.completed ? 'checked' : ''} />
                <span class="todo-text"></span>
            </label>
            <div class="todo-meta">
                <span class="todo-time">${new Date(todo.createdAt).toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit'
                })}</span>
                <button class="todo-delete" type="button" aria-label="删除任务">删除</button>
            </div>
        `;

        li.querySelector('.todo-text').textContent = todo.text;

        li.querySelector('.todo-checkbox').addEventListener('change', () => toggleTodo(todo.id));
        li.querySelector('.todo-delete').addEventListener('click', () => removeTodo(todo.id));

        elements.list.appendChild(li);
    });
};

const render = () => {
    updateStats();
    renderTodos();
    elements.clearCompleted.disabled = !state.todos.some((todo) => todo.completed);
};

const init = () => {
    elements.todayDate.textContent = formatDate();
    loadTodos();
    render();

    elements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        addTodo(elements.input.value);
        elements.input.value = '';
        elements.input.focus();
    });

    elements.clearCompleted.addEventListener('click', clearCompleted);

    elements.filterButtons.forEach((button) => {
        button.addEventListener('click', () => setFilter(button.dataset.filter));
    });
};

init();
