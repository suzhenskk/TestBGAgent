// Todo List 应用
class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.todoCount = document.getElementById('todoCount');
        this.completedCount = document.getElementById('completedCount');
        this.emptyState = document.getElementById('emptyState');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderTodos();
        this.updateStats();
        this.toggleEmptyState();
    }
    
    bindEvents() {
        // 添加按钮点击事件
        this.addBtn.addEventListener('click', () => this.addTodo());
        
        // 输入框回车事件
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
        
        // 输入框焦点事件
        this.todoInput.addEventListener('focus', () => {
            this.todoInput.parentElement.style.transform = 'scale(1.02)';
        });
        
        this.todoInput.addEventListener('blur', () => {
            this.todoInput.parentElement.style.transform = 'scale(1)';
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
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.todos.unshift(todo);
        this.saveTodos();
        this.renderTodos();
        this.updateStats();
        this.toggleEmptyState();
        
        // 清空输入框
        this.todoInput.value = '';
        this.todoInput.focus();
        
        // 添加按钮动画
        this.addBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.addBtn.style.transform = 'scale(1)';
        }, 150);
    }
    
    deleteTodo(id) {
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        if (todoElement) {
            todoElement.classList.add('removing');
            
            setTimeout(() => {
                this.todos = this.todos.filter(todo => todo.id !== id);
                this.saveTodos();
                this.renderTodos();
                this.updateStats();
                this.toggleEmptyState();
            }, 400);
        }
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.updateStats();
            
            // 更新 UI
            const todoElement = document.querySelector(`[data-id="${id}"]`);
            const checkbox = todoElement.querySelector('.todo-checkbox');
            const text = todoElement.querySelector('.todo-text');
            
            if (todo.completed) {
                todoElement.classList.add('completed');
                checkbox.classList.add('checked');
            } else {
                todoElement.classList.remove('completed');
                checkbox.classList.remove('checked');
            }
        }
    }
    
    renderTodos() {
        this.todoList.innerHTML = '';
        
        this.todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.setAttribute('data-id', todo.id);
            
            // 添加延迟动画
            li.style.animationDelay = `${index * 0.1}s`;
            
            li.innerHTML = `
                <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="todoApp.toggleTodo(${todo.id})"></div>
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="todo-delete" onclick="todoApp.deleteTodo(${todo.id})">×</button>
            `;
            
            this.todoList.appendChild(li);
        });
    }
    
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        
        this.todoCount.textContent = `${total} 个任务`;
        this.completedCount.textContent = `${completed} 个已完成`;
        
        // 统计数字变化动画
        this.animateNumber(this.todoCount, total);
        this.animateNumber(this.completedCount, completed);
    }
    
    animateNumber(element, newValue) {
        const currentText = element.textContent;
        const currentNumber = parseInt(currentText.match(/\d+/)[0]);
        
        if (currentNumber !== newValue) {
            element.style.transform = 'scale(1.2)';
            element.style.color = newValue > currentNumber ? '#4caf50' : '#ff4757';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 300);
        }
    }
    
    toggleEmptyState() {
        if (this.todos.length === 0) {
            this.emptyState.classList.add('show');
            this.todoList.style.display = 'none';
        } else {
            this.emptyState.classList.remove('show');
            this.todoList.style.display = 'block';
        }
    }
    
    shakeInput() {
        this.todoInput.style.animation = 'shake 0.5s ease-in-out';
        this.todoInput.style.borderColor = '#ff4757';
        
        setTimeout(() => {
            this.todoInput.style.animation = '';
            this.todoInput.style.borderColor = '';
        }, 500);
    }
    
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 添加 shake 动画到 CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// 初始化应用
let todoApp;

document.addEventListener('DOMContentLoaded', () => {
    todoApp = new TodoApp();
});

// 添加一些示例数据（可选）
function addSampleTodos() {
    const sampleTodos = [
        '学习 JavaScript 基础',
        '完成项目文档',
        '健身 30 分钟',
        '阅读技术文章',
        '整理工作台'
    ];
    
    sampleTodos.forEach(text => {
        const todo = {
            id: Date.now() + Math.random(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        todoApp.todos.push(todo);
    });
    
    todoApp.saveTodos();
    todoApp.renderTodos();
    todoApp.updateStats();
    todoApp.toggleEmptyState();
}

// 添加键盘快捷键
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter 添加任务
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        todoApp.addTodo();
    }
    
    // Escape 清空输入框
    if (e.key === 'Escape') {
        todoApp.todoInput.value = '';
        todoApp.todoInput.blur();
    }
});

// 添加触摸支持
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 向上滑动 - 可以添加新功能
            console.log('向上滑动');
        } else {
            // 向下滑动 - 可以添加新功能
            console.log('向下滑动');
        }
    }
}