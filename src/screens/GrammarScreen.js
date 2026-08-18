import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const GrammarScreen = ({ navigation }) => {
  const grammarTopics = [
    {
      id: 1,
      title: '时态练习',
      subtitle: '掌握各种时态用法',
      icon: 'time-outline',
      color: Colors.primary,
      progress: 75
    },
    {
      id: 2,
      title: '语态练习',
      subtitle: '主动语态与被动语态',
      icon: 'swap-horizontal-outline',
      color: Colors.info,
      progress: 60
    },
    {
      id: 3,
      title: '从句练习',
      subtitle: '定语从句、状语从句',
      icon: 'git-branch-outline',
      color: Colors.success,
      progress: 45
    },
    {
      id: 4,
      title: '虚拟语气',
      subtitle: '条件句与虚拟语气',
      icon: 'help-circle-outline',
      color: Colors.warning,
      progress: 30
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>语法练习</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Overview */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>总体进度</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '52%' }]} />
          </View>
          <Text style={styles.progressText}>52% 完成</Text>
        </View>

        {/* Grammar Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>语法专题</Text>
          {grammarTopics.map((topic) => (
            <TouchableOpacity key={topic.id} style={styles.topicCard}>
              <View style={styles.topicHeader}>
                <View style={[styles.topicIcon, { backgroundColor: topic.color }]}>
                  <Ionicons name={topic.icon} size={24} color={Colors.surface} />
                </View>
                <View style={styles.topicInfo}>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicSubtitle}>{topic.subtitle}</Text>
                </View>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>开始</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.topicProgress}>
                <View style={styles.progressContainer}>
                  <View style={[styles.topicProgressBar, { width: `${topic.progress}%` }]} />
                </View>
                <Text style={styles.topicProgressText}>{topic.progress}%</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Practice */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>快速练习</Text>
          <View style={styles.quickPracticeGrid}>
            <TouchableOpacity style={styles.quickPracticeItem}>
              <Ionicons name="flash-outline" size={32} color={Colors.primary} />
              <Text style={styles.quickPracticeTitle}>随机练习</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickPracticeItem}>
              <Ionicons name="trophy-outline" size={32} color={Colors.warning} />
              <Text style={styles.quickPracticeTitle}>挑战模式</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickPracticeItem}>
              <Ionicons name="repeat-outline" size={32} color={Colors.success} />
              <Text style={styles.quickPracticeTitle}>复习模式</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickPracticeItem}>
              <Ionicons name="analytics-outline" size={32} color={Colors.info} />
              <Text style={styles.quickPracticeTitle}>错题集</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
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
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: Colors.textSecondary,
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
  topicCard: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  topicIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  topicSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startButtonText: {
    color: Colors.surface,
    fontSize: 14,
    fontWeight: 'bold',
  },
  topicProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    marginRight: 10,
  },
  topicProgressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  topicProgressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    minWidth: 35,
  },
  quickPracticeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickPracticeItem: {
    width: '48%',
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  quickPracticeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default GrammarScreen;