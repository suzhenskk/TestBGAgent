import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const { width } = Dimensions.get('window');

const WordCard = ({ word, onPress, style }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnimation] = useState(new Animated.Value(0));

  const flipCard = () => {
    const toValue = isFlipped ? 0 : 1;
    Animated.spring(flipAnimation, {
      toValue,
      useNativeDriver: true,
      tension: 10,
      friction: 8
    }).start();
    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }]
  };
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }]
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={flipCard} style={styles.cardContainer}>
        {/* Front of card */}
        <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]}>
          <View style={styles.cardContent}>
            <Text style={styles.word}>{word.word}</Text>
            <Text style={styles.pronunciation}>{word.pronunciation}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{word.category}</Text>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(word.difficulty) }]}>
                <Text style={styles.difficultyText}>{getDifficultyText(word.difficulty)}</Text>
              </View>
            </View>
            <View style={styles.flipHint}>
              <Ionicons name="refresh" size={16} color={Colors.textLight} />
              <Text style={styles.flipText}>点击查看翻译</Text>
            </View>
          </View>
        </Animated.View>

        {/* Back of card */}
        <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
          <View style={styles.cardContent}>
            <Text style={styles.translation}>{word.translation}</Text>
            <Text style={styles.example}>{word.example}</Text>
            <View style={styles.flipHint}>
              <Ionicons name="refresh" size={16} color={Colors.textLight} />
              <Text style={styles.flipText}>点击返回单词</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'beginner': return Colors.success;
    case 'intermediate': return Colors.warning;
    case 'advanced': return Colors.error;
    default: return Colors.primary;
  }
};

const getDifficultyText = (difficulty) => {
  switch (difficulty) {
    case 'beginner': return '初级';
    case 'intermediate': return '中级';
    case 'advanced': return '高级';
    default: return '未知';
  }
};

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 200,
    marginVertical: 10,
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    backfaceVisibility: 'hidden',
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardFront: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  cardBack: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  pronunciation: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  translation: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.surface,
    marginBottom: 15,
    textAlign: 'center',
  },
  example: {
    fontSize: 16,
    color: Colors.surface,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  category: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 10,
    textTransform: 'capitalize',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: Colors.surface,
    fontWeight: 'bold',
  },
  flipHint: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
  flipText: {
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 5,
  },
});

export default WordCard;