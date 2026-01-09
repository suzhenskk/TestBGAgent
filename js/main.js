// Main entry point for the application
import { EnglishLearningApp } from './app.js';

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        new EnglishLearningApp();
    } catch (error) {
        console.error('Failed to initialize application:', error);
        // Show user-friendly error message
        const container = document.querySelector('.container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #ff1493;">
                    <h2>⚠️ 应用加载失败</h2>
                    <p>请刷新页面重试，或检查浏览器是否支持现代JavaScript功能。</p>
                </div>
            `;
        }
    }
});
