// Date utility functions
export class DateUtils {
    static getTodayString() {
        return new Date().toDateString();
    }

    static getFormattedDate(locale = 'zh-CN', options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date().toLocaleDateString(locale, { ...defaultOptions, ...options });
    }

    static calculateDaysDifference(dateString1, dateString2) {
        const date1 = new Date(dateString1);
        const date2 = new Date(dateString2);
        const diffTime = Math.abs(date2 - date1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    static isConsecutiveDay(lastDate, currentDate) {
        if (!lastDate) return false;
        const daysDiff = this.calculateDaysDifference(lastDate, currentDate);
        return daysDiff === 1;
    }

    static isNewDay(lastDate, currentDate) {
        return lastDate !== currentDate;
    }
}
