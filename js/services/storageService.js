// Storage service for learning data
import { StorageManager } from '../utils/storage.js';
import { CONFIG } from '../config.js';

export class StorageService {
    static loadLearningData() {
        const data = StorageManager.get(CONFIG.STORAGE_KEYS.LEARNING_DATA);
        return {
            learnedWords: data?.learnedWords || [],
            streak: data?.streak || 0,
            lastStudyDate: data?.lastStudyDate || null
        };
    }

    static saveLearningData(learnedWords, streak, lastStudyDate) {
        const data = {
            learnedWords,
            streak,
            lastStudyDate
        };
        return StorageManager.set(CONFIG.STORAGE_KEYS.LEARNING_DATA, data);
    }

    static loadTodayWords() {
        return StorageManager.get(CONFIG.STORAGE_KEYS.TODAY_WORDS) || null;
    }

    static saveTodayWords(words) {
        return StorageManager.set(CONFIG.STORAGE_KEYS.TODAY_WORDS, words);
    }
}
