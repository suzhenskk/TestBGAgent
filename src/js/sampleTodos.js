/**
 * Adds a set of sample todos to the app.
 * Kept for README / console usage.
 *
 * @param {import("./todoApp.js").TodoApp} app
 */
export function addSampleTodos(app) {
  const sampleTodos = [
    "学习 JavaScript 基础",
    "完成项目文档",
    "健身 30 分钟",
    "阅读技术文章",
    "整理工作台",
  ];

  app.addMany(sampleTodos);
}

