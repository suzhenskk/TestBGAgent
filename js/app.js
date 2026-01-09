// Main application class
import { WORD_DATABASE } from '../data/words.js';
import { CONFIG } from './config.js';
import { StorageService } from './services/storageService.js';
import { StreakService } from './services/streakService.js';
import { PronunciationService } from './services/pronunciationService.js';
import { WordUtils } from './utils/wordUtils.js';
import { DateUtils } from './utils/dateUtils.js';
import { UIManager } from './ui/uiManager.js';

export class EnglishLearningApp {
    constructor() {
        this.currentIndex = 0;
        this.todayWords = [];
        this.learnedWords = [];
        this.streak = 0;
        this.lastStudyDate = null;
        
        this.uiManager = new UIManager();
        this.pronunciationService = new PronunciationService(
            CONFIG.SPEECH_LANG,
            CONFIG.SPEECH_RATE
        );
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.loadTodayWords();
        this.updateUI();
    }

    loadData() {
        const data = StorageService.loadLearningData();
        this.learnedWords = data.learnedWords;
        this.streak = data.streak;
        this.lastStudyDate = data.lastStudyDate;
    }

    saveData() {
        StorageService.saveLearningData(
            this.learnedWords,
            this.streak,
            this.lastStudyDate
        );
    }

    setupEventListeners() {
        this.uiManager.elements.nextBtn.addEventListener('click', () => this.nextWord());
        this.uiManager.elements.prevBtn.addEventListener('click', () => this.prevWord());
        this.uiManager.elements.playBtn.addEventListener('click', () => this.playPronunciation());
    }

    loadTodayWords() {
        const today = DateUtils.getTodayString();
        
        if (DateUtils.isNewDay(this.lastStudyDate, today)) {
            // New day - generate new words
            this.todayWords = WordUtils.getRandomWords(WORD_DATABASE, CONFIG.WORDS_PER_DAY);
            this.currentIndex = 0;
            this.updateStreak(today);
        } else {
            // Same day - restore progress
            const savedWords = StorageService.loadTodayWords();
            if (savedWords) {
                this.todayWords = savedWords;
            } else {
                // Fallback: generate new words if none saved
                this.todayWords = WordUtils.getRandomWords(WORD_DATABASE, CONFIG.WORDS_PER_DAY);
            }
        }
    }

    updateStreak(today) {
        const newStreak = StreakService.updateStreak(
            this.streak,
            this.lastStudyDate,
            today
        );
        
        if (newStreak !== null) {
            this.streak = newStreak;
        }
        
        this.lastStudyDate = today;
        this.saveData();
    }

    nextWord() {
        if (this.currentIndex < this.todayWords.length - 1) {
            this.currentIndex++;
            this.markWordAsLearned();
            this.updateUI();
        } else if (this.currentIndex === this.todayWords.length - 1) {
            this.markWordAsLearned();
            this.completeToday();
        }
    }

    prevWord() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateUI();
        }
    }

    markWordAsLearned() {
        const currentWord = this.todayWords[this.currentIndex];
        const learnedWord = WordUtils.markWordAsLearned(currentWord, this.learnedWords);
        
        if (learnedWord) {
            this.learnedWords.push(learnedWord);
            this.saveData();
        }
    }

    completeToday() {
        StorageService.saveTodayWords(this.todayWords);
        alert('🎉 恭喜！你今天已经完成了20个单词的学习！');
        this.currentIndex = 0;
        this.updateUI();
    }

    playPronunciation() {
        if (this.todayWords.length === 0) return;
        
        const currentWord = this.todayWords[this.currentIndex];
        this.pronunciationService.speak(currentWord.word);
    }

    updateUI() {
        if (this.todayWords.length === 0) return;

        const currentWord = this.todayWords[this.currentIndex];
        
        this.uiManager.updateAll(
            currentWord,
            this.currentIndex,
            this.todayWords.length,
            this.streak,
            this.learnedWords
        );
    }
}
