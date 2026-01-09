/**
 * Keyboard shortcuts:
 * - Ctrl/Cmd + Enter => add todo
 * - Escape => clear and blur input
 *
 * @param {object} opts
 * @param {import("../js/todoApp.js").TodoApp} opts.app
 */
export function initKeyboardShortcuts({ app }) {
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      app.addTodo();
    }

    if (e.key === "Escape") {
      app.todoInput.value = "";
      app.todoInput.blur();
    }
  });
}

