// Word utility functions
export class WordUtils {
    static getRandomWords(wordDatabase, count) {
        const shuffled = [...wordDatabase].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    static findWordInArray(words, wordToFind) {
        return words.find(w => w.word === wordToFind);
    }

    static markWordAsLearned(word, learnedWords) {
        if (!this.findWordInArray(learnedWords, word.word)) {
            return {
                ...word,
                learnedDate: new Date().toISOString()
            };
        }
        return null;
    }
}
