// 单词数据库
const wordDatabase = [
    {
        word: "beautiful",
        phonetic: "/ˈbjuːtɪfʊl/",
        meaning: "美丽的，漂亮的",
        example: "She is a beautiful woman."
    },
    {
        word: "happiness",
        phonetic: "/ˈhæpɪnəs/",
        meaning: "幸福，快乐",
        example: "True happiness comes from within."
    },
    {
        word: "knowledge",
        phonetic: "/ˈnɒlɪdʒ/",
        meaning: "知识，学问",
        example: "Knowledge is power."
    },
    {
        word: "success",
        phonetic: "/səkˈses/",
        meaning: "成功，成就",
        example: "Success requires hard work and dedication."
    },
    {
        word: "friendship",
        phonetic: "/ˈfrendʃɪp/",
        meaning: "友谊，友情",
        example: "Friendship is one of life's greatest treasures."
    },
    {
        word: "adventure",
        phonetic: "/ədˈventʃə/",
        meaning: "冒险，奇遇",
        example: "Life is an adventure waiting to be explored."
    },
    {
        word: "wisdom",
        phonetic: "/ˈwɪzdəm/",
        meaning: "智慧，明智",
        example: "With age comes wisdom."
    },
    {
        word: "courage",
        phonetic: "/ˈkʌrɪdʒ/",
        meaning: "勇气，胆量",
        example: "It takes courage to follow your dreams."
    },
    {
        word: "peace",
        phonetic: "/piːs/",
        meaning: "和平，安宁",
        example: "Peace begins with a smile."
    },
    {
        word: "love",
        phonetic: "/lʌv/",
        meaning: "爱，爱情",
        example: "Love is the most powerful force in the universe."
    },
    {
        word: "dream",
        phonetic: "/driːm/",
        meaning: "梦想，理想",
        example: "Never give up on your dreams."
    },
    {
        word: "hope",
        phonetic: "/həʊp/",
        meaning: "希望，期望",
        example: "Hope is the thing with feathers."
    },
    {
        word: "faith",
        phonetic: "/feɪθ/",
        meaning: "信仰，信念",
        example: "Faith can move mountains."
    },
    {
        word: "grace",
        phonetic: "/ɡreɪs/",
        meaning: "优雅，恩典",
        example: "She moved with grace and elegance."
    },
    {
        word: "joy",
        phonetic: "/dʒɔɪ/",
        meaning: "欢乐，喜悦",
        example: "The joy of learning is endless."
    },
    {
        word: "strength",
        phonetic: "/streŋθ/",
        meaning: "力量，强度",
        example: "Inner strength is more powerful than physical strength."
    },
    {
        word: "patience",
        phonetic: "/ˈpeɪʃəns/",
        meaning: "耐心，忍耐",
        example: "Patience is a virtue."
    },
    {
        word: "kindness",
        phonetic: "/ˈkaɪndnəs/",
        meaning: "善良，仁慈",
        example: "Kindness costs nothing but means everything."
    },
    {
        word: "gratitude",
        phonetic: "/ˈɡrætɪtjuːd/",
        meaning: "感激，感谢",
        example: "Gratitude turns what we have into enough."
    },
    {
        word: "forgiveness",
        phonetic: "/fəˈɡɪvnəs/",
        meaning: "宽恕，原谅",
        example: "Forgiveness is the key to inner peace."
    },
    {
        word: "confidence",
        phonetic: "/ˈkɒnfɪdəns/",
        meaning: "自信，信心",
        example: "Confidence is the key to success."
    },
    {
        word: "creativity",
        phonetic: "/ˌkriːeɪˈtɪvəti/",
        meaning: "创造力，创意",
        example: "Creativity is intelligence having fun."
    },
    {
        word: "passion",
        phonetic: "/ˈpæʃən/",
        meaning: "热情，激情",
        example: "Follow your passion and success will follow you."
    },
    {
        word: "determination",
        phonetic: "/dɪˌtɜːmɪˈneɪʃən/",
        meaning: "决心，毅力",
        example: "Determination is the key to achieving your goals."
    },
    {
        word: "optimism",
        phonetic: "/ˈɒptɪmɪzəm/",
        meaning: "乐观，乐观主义",
        example: "Optimism is the faith that leads to achievement."
    },
    {
        word: "empathy",
        phonetic: "/ˈempəθi/",
        meaning: "同理心，共情",
        example: "Empathy is seeing with the eyes of another."
    },
    {
        word: "integrity",
        phonetic: "/ɪnˈteɡrəti/",
        meaning: "正直，诚实",
        example: "Integrity is doing the right thing when no one is watching."
    },
    {
        word: "humility",
        phonetic: "/hjuːˈmɪləti/",
        meaning: "谦逊，谦卑",
        example: "Humility is the foundation of all virtues."
    },
    {
        word: "resilience",
        phonetic: "/rɪˈzɪliəns/",
        meaning: "韧性，适应力",
        example: "Resilience is the ability to bounce back from adversity."
    },
    {
        word: "compassion",
        phonetic: "/kəmˈpæʃən/",
        meaning: "同情，怜悯",
        example: "Compassion is the basis of all morality."
    }
];

class EnglishLearningApp {
    constructor() {
        this.currentIndex = 0;
        this.todayWords = [];
        this.learnedWords = [];
        this.streak = 0;
        this.lastStudyDate = null;
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.updateUI();
        this.loadTodayWords();
    }

    loadData() {
        const savedData = localStorage.getItem('englishLearningData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.learnedWords = data.learnedWords || [];
            this.streak = data.streak || 0;
            this.lastStudyDate = data.lastStudyDate || null;
            this.currentIndex = data.currentIndex || 0;
        }
    }

    saveData() {
        const data = {
            learnedWords: this.learnedWords,
            streak: this.streak,
            lastStudyDate: this.lastStudyDate,
            currentIndex: this.currentIndex
        };
        localStorage.setItem('englishLearningData', JSON.stringify(data));
    }

    setupEventListeners() {
        document.getElementById('nextBtn').addEventListener('click', () => this.nextWord());
        document.getElementById('prevBtn').addEventListener('click', () => this.prevWord());
        document.getElementById('playBtn').addEventListener('click', () => this.playPronunciation());
    }

    loadTodayWords() {
        const today = new Date().toDateString();
        
        // 检查是否是新的学习日
        if (this.lastStudyDate !== today) {
            this.todayWords = this.getRandomWords(20);
            this.currentIndex = 0;
            localStorage.setItem('todayWords', JSON.stringify(this.todayWords));
            this.updateStreak(today);
        } else {
            // 恢复今天的学习进度
            const savedTodayWords = localStorage.getItem('todayWords');
            if (savedTodayWords) {
                this.todayWords = JSON.parse(savedTodayWords);
            } else {
                // 如果是同一天但没有找到今日单词（可能是之前的数据丢失或bug），重新生成
                this.todayWords = this.getRandomWords(20);
                localStorage.setItem('todayWords', JSON.stringify(this.todayWords));
                this.currentIndex = 0;
                this.saveData();
            }
        }
        
        this.updateUI();
    }

    getRandomWords(count) {
        const shuffled = [...wordDatabase].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    updateStreak(today) {
        if (this.lastStudyDate) {
            const lastDate = new Date(this.lastStudyDate);
            const currentDate = new Date(today);
            const diffTime = currentDate - lastDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                this.streak++;
            } else if (diffDays > 1) {
                this.streak = 0;
            }
        } else {
            this.streak = 0;
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
        if (!this.learnedWords.find(w => w.word === currentWord.word)) {
            this.learnedWords.push({
                ...currentWord,
                learnedDate: new Date().toISOString()
            });
            this.saveData();
        }
    }

    completeToday() {
        // 保存今天的学习进度
        localStorage.setItem('todayWords', JSON.stringify(this.todayWords));
        
        // 显示完成消息
        alert('🎉 恭喜！你今天已经完成了20个单词的学习！');
        
        // 重置进度
        this.currentIndex = 0;
        this.updateUI();
    }

    playPronunciation() {
        const currentWord = this.todayWords[this.currentIndex];
        const utterance = new SpeechSynthesisUtterance(currentWord.word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }

    updateUI() {
        if (this.todayWords.length === 0) return;

        const currentWord = this.todayWords[this.currentIndex];
        
        // 更新单词卡片
        document.getElementById('currentWord').textContent = currentWord.word;
        document.getElementById('phonetic').textContent = currentWord.phonetic;
        document.getElementById('meaning').textContent = currentWord.meaning;
        document.getElementById('example').textContent = currentWord.example;
        
        // 更新进度
        const progress = this.currentIndex + 1;
        document.getElementById('progressText').textContent = `今日进度: ${progress}/20`;
        document.getElementById('todayLearned').textContent = progress;
        document.getElementById('todayRemaining').textContent = 20 - progress;
        
        // 更新连续天数
        document.getElementById('totalDays').textContent = this.streak;
        
        // 更新日期
        const today = new Date();
        document.getElementById('currentDate').textContent = today.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // 更新按钮状态
        document.getElementById('prevBtn').disabled = this.currentIndex === 0;
        document.getElementById('nextBtn').textContent = 
            this.currentIndex === this.todayWords.length - 1 ? '完成' : '下一个';
        
        // 更新历史记录
        this.updateHistory();
    }

    updateHistory() {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        
        // 显示最近学习的单词
        const recentWords = this.learnedWords.slice(-10).reverse();
        
        recentWords.forEach(word => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-word">${word.word}</div>
                <div class="history-meaning">${word.meaning}</div>
            `;
            historyList.appendChild(historyItem);
        });
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new EnglishLearningApp();
});