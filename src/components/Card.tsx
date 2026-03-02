import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING, RADIUS } from '../theme/spacing';
import { User } from '../types/user';

const { width } = Dimensions.get('window');

interface CardProps {
  user: User;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: user.images[0] }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.name}, {user.age}</Text>
          <Text style={styles.bio} numberOfLines={2}>{user.bio}</Text>
          <View style={styles.interestsContainer}>
            {user.interests.map((interest, index) => (
              <View key={index} style={styles.interestBadge}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: width * 1.3,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.background.card,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  infoContainer: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: SPACING.xs,
  },
  bio: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: SPACING.md,
    opacity: 0.9,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  interestText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default memo(Card);
