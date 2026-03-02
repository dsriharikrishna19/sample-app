import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING, RADIUS } from '../theme/spacing';
import { User } from '../types/user';
import ImageSlider from './ImageSlider';
import { MapPin } from 'lucide-react-native';

const { width, height: screenHeight } = Dimensions.get('window');
const CARD_HEIGHT = screenHeight * 0.7;

interface CardProps {
  user: User;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageSection}>
        <ImageSlider images={user.images} height={CARD_HEIGHT * 0.5} />
      </View>

      <View style={styles.contentSection}>
        <View style={styles.header}>
          <Text style={styles.name}>{user.fullName}, {user.age}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={COLORS.text.secondary} />
            <Text style={styles.location}>{user.city}, {user.country}</Text>
          </View>
        </View>

        <Text style={styles.bio}>{user.bio}</Text>

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Zodiac</Text>
            <Text style={styles.detailValue}>{user.zodiacSign}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Height</Text>
            <Text style={styles.detailValue}>{user.height}cm</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Looking for</Text>
            <Text style={styles.detailValue}>{user.relationshipType}</Text>
          </View>
        </View>

        <View style={styles.interestsContainer}>
          {user.interests.slice(0, 3).map((interest: string, index: number) => (
            <View key={index} style={styles.interestBadge}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.92,
    height: CARD_HEIGHT,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.background.card,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  imageSection: {
    height: '50%',
    width: '100%',
  },
  contentSection: {
    height: '50%',
    padding: SPACING.lg,
    backgroundColor: COLORS.background.card,
  },
  header: {
    marginBottom: SPACING.sm,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  location: {
    fontSize: 13,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  bio: {
    fontSize: 15,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginVertical: SPACING.sm,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    marginVertical: SPACING.md,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    color: COLORS.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestBadge: {
    backgroundColor: COLORS.secondary + '20',
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.secondary + '40',
  },
  interestText: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default memo(Card);
