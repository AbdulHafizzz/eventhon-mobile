import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, Calendar, Clock, Users, MapPin, Sparkles, Star } from 'lucide-react-native';

const eventCategories = ['All', 'AI/ML', 'Web Dev', 'Mobile', 'Blockchain', 'IoT'];

const eventsData = [
  {
    id: 1,
    title: 'AI Innovation Challenge 2024',
    organizer: 'TechCorp',
    date: 'Mar 15-17, 2024',
    duration: '48 hours',
    participants: 150,
    location: 'San Francisco, CA',
    category: 'AI/ML',
    status: 'Open',
    aiRecommended: true,
    prizePool: '$50,000',
    difficulty: 'Intermediate',
  },
  {
    id: 2,
    title: 'Sustainable Future Hackathon',
    organizer: 'GreenTech Solutions',
    date: 'Mar 22-24, 2024',
    duration: '72 hours',
    participants: 200,
    location: 'Online',
    category: 'IoT',
    status: 'Open',
    aiRecommended: false,
    prizePool: '$25,000',
    difficulty: 'Beginner',
  },
  {
    id: 3,
    title: 'Fintech Revolution 2024',
    organizer: 'BankingCorp',
    date: 'Apr 5-7, 2024',
    duration: '48 hours',
    participants: 120,
    location: 'New York, NY',
    category: 'Blockchain',
    status: 'Opening Soon',
    aiRecommended: true,
    prizePool: '$75,000',
    difficulty: 'Advanced',
  },
];

export default function EventsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = eventsData.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return '#10B981';
      case 'Opening Soon': return '#F59E0B';
      case 'Closed': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Events</Text>
        <Text style={styles.headerSubtitle}>Find your next hackathon adventure</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search events..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#6366F1" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {eventCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* AI Recommended Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={20} color="#8B5CF6" fill="#8B5CF6" />
              <Text style={styles.sectionTitle}>AI Recommended</Text>
            </View>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.recommendedScroll}
          >
            {eventsData.filter(event => event.aiRecommended).map((event) => (
              <TouchableOpacity key={event.id} style={styles.recommendedCard}>
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  style={styles.recommendedGradient}
                >
                  <View style={styles.recommendedHeader}>
                    <Text style={styles.recommendedTitle}>{event.title}</Text>
                    <Star size={16} color="#FFF" fill="#FFF" />
                  </View>
                  <Text style={styles.recommendedOrganizer}>{event.organizer}</Text>
                  <Text style={styles.recommendedPrize}>{event.prizePool}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* All Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Events</Text>
          
          {filteredEvents.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <View style={styles.eventTitleContainer}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  {event.aiRecommended && (
                    <View style={styles.aiBadge}>
                      <Sparkles size={12} color="#8B5CF6" fill="#8B5CF6" />
                      <Text style={styles.aiBadgeText}>AI Pick</Text>
                    </View>
                  )}
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(event.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(event.status) }]}>
                    {event.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.organizer}>by {event.organizer}</Text>

              <View style={styles.eventDetails}>
                <View style={styles.eventDetailItem}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.eventDetailText}>{event.date}</Text>
                </View>
                <View style={styles.eventDetailItem}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.eventDetailText}>{event.duration}</Text>
                </View>
                <View style={styles.eventDetailItem}>
                  <Users size={16} color="#6B7280" />
                  <Text style={styles.eventDetailText}>{event.participants} participants</Text>
                </View>
                <View style={styles.eventDetailItem}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={styles.eventDetailText}>{event.location}</Text>
                </View>
              </View>

              <View style={styles.eventFooter}>
                <View style={styles.eventMeta}>
                  <View style={styles.categoryTag}>
                    <Text style={styles.categoryTagText}>{event.category}</Text>
                  </View>
                  <View style={[styles.difficultyTag, { backgroundColor: getDifficultyColor(event.difficulty) + '20' }]}>
                    <Text style={[styles.difficultyTagText, { color: getDifficultyColor(event.difficulty) }]}>
                      {event.difficulty}
                    </Text>
                  </View>
                </View>
                <Text style={styles.prizePool}>{event.prizePool}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  searchInputContainer: {
    flex: 1,
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
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
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
  recommendedScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  recommendedCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  recommendedGradient: {
    padding: 20,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recommendedTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  recommendedOrganizer: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  recommendedPrize: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  eventCard: {
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
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 4,
    alignSelf: 'flex-start',
  },
  aiBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#8B5CF6',
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
  organizer: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 16,
  },
  eventDetails: {
    gap: 8,
    marginBottom: 16,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventDetailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryTagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  difficultyTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyTagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  prizePool: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
});