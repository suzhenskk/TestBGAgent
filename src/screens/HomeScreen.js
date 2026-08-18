import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const progress = 65; // 示例进度
  const streak = 7; // 连续学习天数
  const totalWords = 150; // 总单词数
  const learnedWords = 98; // 已学单词数

  const menuItems = [
    {
      id: 'words',
      title: '单词学习',
      subtitle: '掌握新词汇',
      icon: 'book-outline',
      color: Colors.primary,
      screen: 'WordsScreen'
    },
    {
      id: 'grammar',
      title: '语法练习',
      subtitle: '提升语法能力',
      icon: 'document-text-outline',
      color: Colors.info,
      screen: 'GrammarScreen'
    },
    {
      id: 'listening',
      title: '听力练习',
      subtitle: '提高听力理解',
      icon: 'headset-outline',
      color: Colors.success,
      screen: 'ListeningScreen'
    },
    {
      id: 'reading',
      title: '阅读练习',
      subtitle: '增强阅读理解',
      icon: 'library-outline',
      color: Colors.warning,
      screen: 'ReadingScreen'
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>早上好！</Text>
          <Text style={styles.subtitle}>继续你的英语学习之旅</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={40} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>学习进度</Text>
          <Text style={styles.progressPercentage}>{progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={20} color={Colors.warning} />
            <Text style={styles.statText}>{streak} 天连续</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.statText}>{learnedWords}/{totalWords} 单词</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>快速开始</Text>
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={24} color={Colors.surface} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Daily Challenge */}
      <View style={styles.challengeCard}>
        <View style={styles.challengeHeader}>
          <Ionicons name="trophy" size={24} color={Colors.warning} />
          <Text style={styles.challengeTitle}>每日挑战</Text>
        </View>
        <Text style={styles.challengeDescription}>
          完成今天的单词测试，获得额外积分！
        </Text>
        <TouchableOpacity style={styles.challengeButton}>
          <Text style={styles.challengeButtonText}>开始挑战</Text>
          <Ionicons name="arrow-forward" size={16} color={Colors.surface} />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  profileButton: {
    padding: 5,
  },
  progressCard: {
    backgroundColor: Colors.surface,
    margin: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    marginBottom: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 5,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: (width - 60) / 2,
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  menuIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  menuSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  challengeCard: {
    backgroundColor: Colors.surface,
    margin: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 10,
  },
  challengeDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 15,
    lineHeight: 20,
  },
  challengeButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  challengeButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default HomeScreen;