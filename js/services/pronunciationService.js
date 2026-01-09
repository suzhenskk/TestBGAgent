// Pronunciation service using Web Speech API
export class PronunciationService {
    constructor(lang = 'en-US', rate = 0.8) {
        this.lang = lang;
        this.rate = rate;
    }

    speak(word) {
        if (!('speechSynthesis' in window)) {
            console.warn('Speech synthesis not supported');
            return false;
        }

        try {
            // Cancel any ongoing speech
            speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = this.lang;
            utterance.rate = this.rate;

            speechSynthesis.speak(utterance);
            return true;
        } catch (error) {
            console.error('Error playing pronunciation:', error);
            return false;
        }
    }

    stop() {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
    }
}
