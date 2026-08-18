import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import WordCard from '../components/WordCard';
import { words, categories, difficulties } from '../data/words';

const { width } = Dimensions.get('window');

const WordsScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [filteredWords, setFilteredWords] = useState(words);

  useEffect(() => {
    filterWords();
  }, [selectedCategory, selectedDifficulty]);

  const filterWords = () => {
    let filtered = words;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(word => word.category === selectedCategory);
    }
    
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(word => word.difficulty === selectedDifficulty);
    }
    
    setFilteredWords(filtered);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategory
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.selectedCategoryText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderDifficultyItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.difficultyItem,
        selectedDifficulty === item.id && styles.selectedDifficulty
      ]}
      onPress={() => setSelectedDifficulty(item.id)}
    >
      <Text style={[
        styles.difficultyText,
        selectedDifficulty === item.id && styles.selectedDifficultyText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderWordItem = ({ item }) => (
    <WordCard word={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>单词学习</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>分类筛选</Text>
        <FlatList
          data={[{ id: 'all', name: '全部', icon: '📚' }, ...categories]}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        />
      </View>

      {/* Difficulties */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>难度等级</Text>
        <FlatList
          data={[{ id: 'all', name: '全部', color: Colors.primary }, ...difficulties]}
          renderItem={renderDifficultyItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.difficultiesContainer}
        />
      </View>

      {/* Words List */}
      <View style={styles.wordsSection}>
        <View style={styles.wordsHeader}>
          <Text style={styles.wordsTitle}>单词列表</Text>
          <Text style={styles.wordsCount}>{filteredWords.length} 个单词</Text>
        </View>
        <FlatList
          data={filteredWords}
          renderItem={renderWordItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.wordsContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.surface,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  categoriesContainer: {
    paddingRight: 20,
  },
  categoryItem: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: Colors.surface,
    borderRadius: 15,
    minWidth: 80,
    elevation: 1,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: Colors.surface,
    fontWeight: 'bold',
  },
  difficultiesContainer: {
    paddingRight: 20,
  },
  difficultyItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    elevation: 1,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  selectedDifficulty: {
    backgroundColor: Colors.primary,
  },
  difficultyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  selectedDifficultyText: {
    color: Colors.surface,
    fontWeight: 'bold',
  },
  wordsSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  wordsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  wordsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  wordsCount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  wordsContainer: {
    paddingBottom: 20,
  },
});

export default WordsScreen;