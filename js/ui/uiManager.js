// UI Manager for DOM updates
import { CONFIG } from '../config.js';
import { DateUtils } from '../utils/dateUtils.js';

export class UIManager {
    constructor() {
        this.elements = this.initializeElements();
    }

    initializeElements() {
        return {
            currentWord: document.getElementById('currentWord'),
            phonetic: document.getElementById('phonetic'),
            meaning: document.getElementById('meaning'),
            example: document.getElementById('example'),
            progressText: document.getElementById('progressText'),
            todayLearned: document.getElementById('todayLearned'),
            todayRemaining: document.getElementById('todayRemaining'),
            totalDays: document.getElementById('totalDays'),
            currentDate: document.getElementById('currentDate'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn'),
            historyList: document.getElementById('historyList')
        };
    }

    updateWordCard(word) {
        if (!word) return;

        this.elements.currentWord.textContent = word.word;
        this.elements.phonetic.textContent = word.phonetic;
        this.elements.meaning.textContent = word.meaning;
        this.elements.example.textContent = word.example;
    }

    updateProgress(currentIndex, totalWords) {
        const progress = currentIndex + 1;
        const remaining = totalWords - progress;

        this.elements.progressText.textContent = `今日进度: ${progress}/${totalWords}`;
        this.elements.todayLearned.textContent = progress;
        this.elements.todayRemaining.textContent = remaining;
    }

    updateStreak(streak) {
        this.elements.totalDays.textContent = streak;
    }

    updateDate() {
        this.elements.currentDate.textContent = DateUtils.getFormattedDate(
            CONFIG.DATE_LOCALE,
            CONFIG.DATE_OPTIONS
        );
    }

    updateNavigationButtons(currentIndex, totalWords) {
        this.elements.prevBtn.disabled = currentIndex === 0;
        this.elements.nextBtn.textContent = 
            currentIndex === totalWords - 1 ? '完成' : '下一个';
    }

    updateHistory(learnedWords, displayCount = CONFIG.HISTORY_DISPLAY_COUNT) {
        this.elements.historyList.innerHTML = '';
        
        const recentWords = learnedWords.slice(-displayCount).reverse();
        
        recentWords.forEach(word => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-word">${word.word}</div>
                <div class="history-meaning">${word.meaning}</div>
            `;
            this.elements.historyList.appendChild(historyItem);
        });
    }

    updateAll(word, currentIndex, totalWords, streak, learnedWords) {
        this.updateWordCard(word);
        this.updateProgress(currentIndex, totalWords);
        this.updateStreak(streak);
        this.updateDate();
        this.updateNavigationButtons(currentIndex, totalWords);
        this.updateHistory(learnedWords);
    }
}
