import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING, RADIUS } from '../theme/spacing';
import { User } from '../types/user';
import ImageSlider from './ImageSlider';
import { MapPin, Info, Ruler, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppText from './AppText';

const { width, height: screenHeight } = Dimensions.get('window');
const CARD_HEIGHT = screenHeight * 0.72;

interface CardProps {
  user: User;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <ImageSlider images={user.images} height={CARD_HEIGHT} />

        {/* Top Gradient for Pagination Background Support */}
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'transparent']}
          style={styles.topGradient}
          pointerEvents="none"
        />

        {/* Info Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
          style={styles.bottomGradient}
          pointerEvents="none"
        >
          <View style={styles.infoContent}>
            <View style={styles.mainInfo}>
              <View style={styles.nameRow}>
                <AppText variant="h2" color={COLORS.text.light} style={styles.name}>
                  {user.fullName}, {user.age}
                </AppText>
              </View>

              <View style={styles.locationContainer}>
                <MapPin size={16} color="rgba(255,255,255,0.8)" />
                <AppText variant="caption" color="rgba(255,255,255,0.8)" style={styles.location}>
                  {user.city}, {user.country}
                </AppText>
              </View>
            </View>

            <AppText
              variant="small"
              color="rgba(255,255,255,0.9)"
              numberOfLines={2}
              style={styles.bio}
            >
              {user.bio}
            </AppText>

            <View style={styles.attributesRow}>
              <View style={styles.attribute}>
                <Zap size={14} color={COLORS.primary} />
                <AppText variant="tiny" color={COLORS.text.light} style={styles.attributeText}>
                  {user.zodiacSign}
                </AppText>
              </View>
              <View style={styles.attribute}>
                <Ruler size={14} color={COLORS.secondary} />
                <AppText variant="tiny" color={COLORS.text.light} style={styles.attributeText}>
                  {user.height}cm
                </AppText>
              </View>
              <View style={styles.attribute}>
                <Info size={14} color={COLORS.accent} />
                <AppText variant="tiny" color={COLORS.text.light} style={styles.attributeText}>
                  {user.relationshipType}
                </AppText>
              </View>
            </View>

            <View style={styles.interestsContainer}>
              {user.interests.slice(0, 3).map((interest: string, index: number) => (
                <View key={index} style={styles.interestBadge}>
                  <AppText variant="tiny" color={COLORS.text.light} style={styles.interestText}>
                    {interest}
                  </AppText>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.94,
    height: CARD_HEIGHT,
    borderRadius: RADIUS.xxl,
    backgroundColor: COLORS.background.card,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 2,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: SPACING.lg,
    zIndex: 2,
  },
  infoContent: {
    width: '100%',
  },
  mainInfo: {
    marginBottom: SPACING.xs,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  location: {
    fontWeight: '600',
  },
  bio: {
    lineHeight: 18,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
    opacity: 0.9,
  },
  attributesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  attribute: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.md,
    gap: 4,
  },
  attributeText: {
    fontWeight: '700',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  interestBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: SPACING.md,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  interestText: {
    fontWeight: '600',
    fontSize: 11,
  },
});

export default memo(Card);
