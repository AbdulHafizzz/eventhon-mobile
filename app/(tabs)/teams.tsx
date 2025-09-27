import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Users, Plus, Brain, Star, MessageCircle, UserPlus, Sparkles } from 'lucide-react-native';

const myTeams = [
  {
    id: 1,
    name: 'AI Innovators',
    event: 'AI Innovation Challenge 2024',
    members: 4,
    role: 'Team Lead',
    progress: 75,
    status: 'Active',
    aiInsights: 'High compatibility score: 92%',
  },
  {
    id: 2,
    name: 'Green Code Warriors',
    event: 'Sustainable Future Hackathon',
    members: 3,
    role: 'Developer',
    progress: 45,
    status: 'Recruiting',
    aiInsights: 'Need: UX/UI Designer',
  },
];

const availableTeams = [
  {
    id: 3,
    name: 'FinTech Rebels',
    event: 'Fintech Revolution 2024',
    members: 2,
    maxMembers: 5,
    lookingFor: ['React Developer', 'UI/UX Designer'],
    compatibility: 88,
    skills: ['JavaScript', 'Python', 'Blockchain'],
    isAiRecommended: true,
  },
  {
    id: 4,
    name: 'Data Ninjas',
    event: 'AI Innovation Challenge 2024',
    members: 3,
    maxMembers: 4,
    lookingFor: ['Machine Learning Engineer'],
    compatibility: 76,
    skills: ['Python', 'TensorFlow', 'AWS'],
    isAiRecommended: false,
  },
];

const skillSuggestions = [
  { skill: 'React', count: 23, color: '#61DAFB' },
  { skill: 'Python', count: 31, color: '#3776AB' },
  { skill: 'Node.js', count: 18, color: '#339933' },
  { skill: 'AI/ML', count: 15, color: '#FF6B6B' },
];

export default function TeamsScreen() {
  const [activeTab, setActiveTab] = useState('my-teams');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#10B981';
      case 'Recruiting': return '#F59E0B';
      case 'Complete': return '#6366F1';
      default: return '#6B7280';
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Teams</Text>
        <Text style={styles.headerSubtitle}>Collaborate and build amazing projects</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'my-teams' && styles.tabActive]}
          onPress={() => setActiveTab('my-teams')}
        >
          <Text style={[styles.tabText, activeTab === 'my-teams' && styles.tabTextActive]}>
            My Teams
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'discover' && styles.tabActive]}
          onPress={() => setActiveTab('discover')}
        >
          <Text style={[styles.tabText, activeTab === 'discover' && styles.tabTextActive]}>
            Discover
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'my-teams' ? (
          <>
            {/* My Teams */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your Teams</Text>
                <TouchableOpacity style={styles.createTeamButton}>
                  <Plus size={20} color="#6366F1" />
                  <Text style={styles.createTeamText}>Create Team</Text>
                </TouchableOpacity>
              </View>

              {myTeams.map((team) => (
                <TouchableOpacity key={team.id} style={styles.teamCard}>
                  <View style={styles.teamHeader}>
                    <View style={styles.teamInfo}>
                      <Text style={styles.teamName}>{team.name}</Text>
                      <Text style={styles.eventName}>{team.event}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(team.status) + '20' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(team.status) }]}>
                        {team.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.teamStats}>
                    <View style={styles.teamStat}>
                      <Users size={16} color="#6B7280" />
                      <Text style={styles.teamStatText}>{team.members} members</Text>
                    </View>
                    <View style={styles.teamStat}>
                      <Text style={styles.roleText}>{team.role}</Text>
                    </View>
                  </View>

                  <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                      <Text style={styles.progressLabel}>Progress</Text>
                      <Text style={styles.progressPercent}>{team.progress}%</Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${team.progress}%` }]} />
                    </View>
                  </View>

                  <View style={styles.aiInsightContainer}>
                    <Brain size={16} color="#8B5CF6" />
                    <Text style={styles.aiInsightText}>{team.aiInsights}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Search */}
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <Search size={20} color="#6B7280" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search teams by skills, event..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            {/* AI Recommendations */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  <Sparkles size={20} color="#8B5CF6" fill="#8B5CF6" />
                  <Text style={styles.sectionTitle}>AI Recommended</Text>
                </View>
              </View>

              {availableTeams
                .filter(team => team.isAiRecommended)
                .map((team) => (
                  <TouchableOpacity key={team.id} style={styles.recommendedTeamCard}>
                    <LinearGradient
                      colors={['#6366F1', '#8B5CF6']}
                      style={styles.compatibilityGradient}
                    >
                      <Text style={styles.compatibilityScore}>{team.compatibility}%</Text>
                      <Text style={styles.compatibilityLabel}>Match</Text>
                    </LinearGradient>

                    <View style={styles.teamContent}>
                      <View style={styles.teamMainInfo}>
                        <Text style={styles.teamName}>{team.name}</Text>
                        <Text style={styles.eventName}>{team.event}</Text>
                        <Text style={styles.memberCount}>
                          {team.members}/{team.maxMembers} members
                        </Text>
                      </View>

                      <View style={styles.lookingFor}>
                        <Text style={styles.lookingForLabel}>Looking for:</Text>
                        <View style={styles.skillTags}>
                          {team.lookingFor.map((skill, index) => (
                            <View key={index} style={styles.skillTag}>
                              <Text style={styles.skillTagText}>{skill}</Text>
                            </View>
                          ))}
                        </View>
                      </View>

                      <View style={styles.teamActions}>
                        <TouchableOpacity style={styles.joinButton}>
                          <UserPlus size={16} color="#FFFFFF" />
                          <Text style={styles.joinButtonText}>Request to Join</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.chatButton}>
                          <MessageCircle size={16} color="#6366F1" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>

            {/* Popular Skills */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending Skills</Text>
              <View style={styles.skillSuggestions}>
                {skillSuggestions.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.skillSuggestion}>
                    <View style={[styles.skillIcon, { backgroundColor: item.color + '20' }]}>
                      <View style={[styles.skillDot, { backgroundColor: item.color }]} />
                    </View>
                    <View style={styles.skillInfo}>
                      <Text style={styles.skillName}>{item.skill}</Text>
                      <Text style={styles.skillCount}>{item.count} teams</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* All Available Teams */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>All Teams</Text>

              {availableTeams.map((team) => (
                <TouchableOpacity key={team.id} style={styles.teamCard}>
                  <View style={styles.teamHeader}>
                    <View style={styles.teamInfo}>
                      <Text style={styles.teamName}>{team.name}</Text>
                      <Text style={styles.eventName}>{team.event}</Text>
                    </View>
                    <View style={[
                      styles.compatibilityBadge,
                      { backgroundColor: getCompatibilityColor(team.compatibility) + '20' }
                    ]}>
                      <Text style={[
                        styles.compatibilityText,
                        { color: getCompatibilityColor(team.compatibility) }
                      ]}>
                        {team.compatibility}% match
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.memberCount}>
                    {team.members}/{team.maxMembers} members
                  </Text>

                  <View style={styles.lookingFor}>
                    <Text style={styles.lookingForLabel}>Looking for:</Text>
                    <View style={styles.skillTags}>
                      {team.lookingFor.map((skill, index) => (
                        <View key={index} style={styles.skillTag}>
                          <Text style={styles.skillTagText}>{skill}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.teamSkills}>
                    <Text style={styles.skillsLabel}>Team Skills:</Text>
                    <View style={styles.skillTags}>
                      {team.skills.map((skill, index) => (
                        <View key={index} style={[styles.skillTag, styles.teamSkillTag]}>
                          <Text style={[styles.skillTagText, styles.teamSkillText]}>{skill}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.teamActions}>
                    <TouchableOpacity style={styles.joinButton}>
                      <UserPlus size={16} color="#FFFFFF" />
                      <Text style={styles.joinButtonText}>Request to Join</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chatButton}>
                      <MessageCircle size={16} color="#6366F1" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#1F2937',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  createTeamButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  createTeamText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366F1',
  },
  teamCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  eventName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  teamStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  teamStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  teamStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  roleText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366F1',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  progressPercent: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6366F1',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
  },
  aiInsightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  aiInsightText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366F1',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  recommendedTeamCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 0,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
  },
  compatibilityGradient: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  compatibilityScore: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  compatibilityLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  teamContent: {
    flex: 1,
    padding: 20,
  },
  teamMainInfo: {
    marginBottom: 16,
  },
  memberCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
  },
  lookingFor: {
    marginBottom: 16,
  },
  lookingForLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  skillTagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#92400E',
  },
  teamSkills: {
    marginBottom: 16,
  },
  skillsLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  teamSkillTag: {
    backgroundColor: '#E0E7FF',
  },
  teamSkillText: {
    color: '#3730A3',
  },
  teamActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  joinButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  joinButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  chatButton: {
    backgroundColor: '#F0F4FF',
    padding: 12,
    borderRadius: 8,
  },
  compatibilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  compatibilityText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  skillSuggestions: {
    gap: 12,
  },
  skillSuggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  skillIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  skillCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});