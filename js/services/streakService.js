// Streak calculation service
import { DateUtils } from '../utils/dateUtils.js';

export class StreakService {
    static calculateStreak(lastStudyDate, currentDate) {
        if (!lastStudyDate) {
            return 0;
        }

        if (DateUtils.isConsecutiveDay(lastStudyDate, currentDate)) {
            // Continue streak
            return null; // Will be incremented by caller
        } else if (DateUtils.isNewDay(lastStudyDate, currentDate)) {
            // Streak broken
            return 0;
        }

        // Same day, keep current streak
        return null;
    }

    static updateStreak(currentStreak, lastStudyDate, currentDate) {
        const newStreak = this.calculateStreak(lastStudyDate, currentDate);
        
        if (newStreak === 0) {
            return 0;
        } else if (newStreak === null && DateUtils.isConsecutiveDay(lastStudyDate, currentDate)) {
            return currentStreak + 1;
        }
        
        return currentStreak;
    }
}
