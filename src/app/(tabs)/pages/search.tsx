import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    Dimensions
} from 'react-native';
import {
    Search as SearchIcon,
    Filter,
    MapPin,
    Music,
    Plane,
    Utensils,
    Dumbbell,
    Palette,
    Film,
    Check,
    X
} from 'lucide-react-native';
import AppText from '../../../components/AppText';
import { COLORS } from '../../../theme/colors';
import { SPACING, RADIUS } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';
import { useResponsive } from '../../../hooks/useResponsive';
import { MOCK_USERS } from '../../../utils/mockData';
import Avatar from '../../../components/Avatar';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const INTEREST_ICONS: Record<string, any> = {
    'Music': Music,
    'Travel': Plane,
    'Food': Utensils,
    'Fitness': Dumbbell,
    'Art': Palette,
    'Movies': Film,
};

export default function SearchScreen() {
    const { isTablet, width } = useResponsive();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isFilterVisible, setIsFilterVisible] = React.useState(false);
    const [filters, setFilters] = React.useState({
        distance: 10,
        ageRange: [18, 30],
        gender: 'both' as 'male' | 'female' | 'both'
    });

    const filteredResults = React.useMemo(() => {
        if (!searchQuery.trim()) return MOCK_USERS;
        const query = searchQuery.toLowerCase();
        return MOCK_USERS.filter(user =>
            user.fullName.toLowerCase().includes(query) ||
            user.interests.some(i => i.toLowerCase().includes(query))
        );
    }, [searchQuery]);

    const handleInterestPress = (interest: string) => {
        setSearchQuery(interest);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <AppText variant="h1" style={styles.title}>Discovery</AppText>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setIsFilterVisible(true)}
                >
                    <Filter color={COLORS.primary} size={20} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <SearchIcon color={COLORS.text.tertiary} size={20} style={{ marginRight: SPACING.sm }} />
                    <TextInput
                        placeholder="Search by name or interest"
                        placeholderTextColor={COLORS.text.tertiary}
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <X color={COLORS.text.tertiary} size={18} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <AppText variant="h3">{searchQuery ? 'Search Results' : 'Nearby You'}</AppText>
                        {!searchQuery && (
                            <TouchableOpacity>
                                <AppText variant="link" color={COLORS.primary}>See All</AppText>
                            </TouchableOpacity>
                        )}
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                        {filteredResults.length > 0 ? (
                            filteredResults.map((user) => (
                                <TouchableOpacity key={user.id} style={styles.userCard}>
                                    <Avatar
                                        uri={user.images[0]}
                                        size={width * 0.4}
                                        showOnline={true}
                                        imageStyle={{ borderRadius: RADIUS.xl }}
                                        style={styles.userImageContainer}
                                    />
                                    <View style={styles.cardGradient} />
                                    <View style={styles.userOverlay}>
                                        <View style={styles.nameRow}>
                                            <AppText variant="small" color={COLORS.text.light} weight="bold">{user.fullName}, {user.age}</AppText>
                                        </View>
                                        <View style={styles.locationRow}>
                                            <MapPin size={10} color={COLORS.text.light} />
                                            <AppText variant="tiny" color={COLORS.text.light} style={{ marginLeft: 2 }}>2.5 km</AppText>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={[styles.emptyResults, { width: width - SPACING.lg * 2 }]}>
                                <SearchIcon color={COLORS.text.tertiary} size={40} />
                                <AppText variant="bodyBold" style={{ marginTop: SPACING.sm }}>No users found</AppText>
                                <AppText variant="small" color={COLORS.text.tertiary}>Try a different search term</AppText>
                            </View>
                        )}
                    </ScrollView>
                </View>

                {!searchQuery && (
                    <View style={styles.section}>
                        <AppText variant="h3" style={styles.sectionTitle}>Shared Interests</AppText>
                        <View style={styles.interestGrid}>
                            {['Music', 'Travel', 'Food', 'Fitness', 'Art', 'Movies'].map((interest) => {
                                const Icon = INTEREST_ICONS[interest];
                                return (
                                    <TouchableOpacity
                                        key={interest}
                                        style={styles.interestItem}
                                        onPress={() => handleInterestPress(interest)}
                                    >
                                        <View style={styles.interestIconCircle}>
                                            {Icon && <Icon color={COLORS.primary} size={22} />}
                                        </View>
                                        <AppText variant="bodyBold" color={COLORS.text.primary}>{interest}</AppText>
                                        <AppText variant="tiny" color={COLORS.text.secondary}>1.2k people</AppText>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                )}
            </ScrollView>

            <Modal
                visible={isFilterVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsFilterVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsFilterVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.modalContent}
                        activeOpacity={1}
                    >
                        <View style={styles.modalHeader}>
                            <AppText variant="h2">Filters</AppText>
                            <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
                                <X color={COLORS.text.primary} size={24} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody}>
                            <View style={styles.filterSection}>
                                <AppText variant="bodyBold">Gender Preference</AppText>
                                <View style={styles.genderRow}>
                                    {['male', 'female', 'both'].map((g) => (
                                        <TouchableOpacity
                                            key={g}
                                            style={[
                                                styles.genderOption,
                                                filters.gender === g && styles.genderOptionActive
                                            ]}
                                            onPress={() => setFilters({ ...filters, gender: g as any })}
                                        >
                                            <AppText
                                                variant="bodyBold"
                                                color={filters.gender === g ? COLORS.text.light : COLORS.text.primary}
                                                style={{ textTransform: 'capitalize' }}
                                            >
                                                {g}
                                            </AppText>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <View style={styles.filterSection}>
                                <View style={styles.filterLabelRow}>
                                    <AppText variant="bodyBold">Distance</AppText>
                                    <AppText variant="bodyBold" color={COLORS.primary}>{filters.distance} km</AppText>
                                </View>
                                <View style={styles.fakeSlider}>
                                    <View style={[styles.sliderTrack, { width: `${filters.distance}%` }]} />
                                    <View style={[styles.sliderThumb, { left: `${filters.distance}%` }]} />
                                </View>
                            </View>

                            <View style={styles.filterSection}>
                                <View style={styles.filterLabelRow}>
                                    <AppText variant="bodyBold">Age Range</AppText>
                                    <AppText variant="bodyBold" color={COLORS.primary}>{filters.ageRange[0]} - {filters.ageRange[1]}</AppText>
                                </View>
                                <View style={styles.fakeSlider}>
                                    <View style={[styles.sliderTrack, { left: '10%', width: '50%' }]} />
                                    <View style={[styles.sliderThumb, { left: '10%' }]} />
                                    <View style={[styles.sliderThumb, { left: '60%' }]} />
                                </View>
                            </View>
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => setIsFilterVisible(false)}
                        >
                            <AppText variant="bodyBold" color={COLORS.text.light}>Apply Filters</AppText>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.main,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
    title: {
        fontWeight: TYPOGRAPHY.weight.black,
    },
    filterButton: {
        width: 44,
        height: 44,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.background.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    searchContainer: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.md,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background.surface,
        paddingHorizontal: SPACING.md,
        height: 52,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text.primary,
        fontWeight: '500',
    },
    scrollContent: {
        paddingBottom: SPACING.xxl,
    },
    section: {
        paddingVertical: SPACING.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
    },
    sectionTitle: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
    },
    horizontalList: {
        paddingLeft: SPACING.lg,
        paddingRight: SPACING.md,
        gap: SPACING.md,
    },
    userCard: {
        width: 140,
        height: 190,
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
        backgroundColor: COLORS.background.surface,
    },
    userImageContainer: {
        width: '100%',
        height: '100%',
    },
    cardGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        backgroundColor: 'rgba(0,0,0,0.6)', // Simple gradient alternative
    },
    userOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: SPACING.sm,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    interestGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: SPACING.lg,
        gap: SPACING.md,
    },
    interestItem: {
        width: '47%',
        backgroundColor: COLORS.background.card,
        padding: SPACING.lg,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.divider,
        elevation: 1,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        alignItems: 'center',
    },
    interestIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.primaryAlpha(0.1),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    emptyResults: {
        height: 190,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.divider,
        borderStyle: 'dashed',
        borderRadius: RADIUS.lg,
        marginHorizontal: SPACING.lg,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.background.main,
        borderTopLeftRadius: RADIUS.xxl,
        borderTopRightRadius: RADIUS.xxl,
        padding: SPACING.xl,
        maxHeight: SCREEN_HEIGHT * 0.8,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    modalBody: {
        marginBottom: SPACING.xl,
    },
    filterSection: {
        marginBottom: SPACING.xl,
    },
    filterLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    genderRow: {
        flexDirection: 'row',
        gap: SPACING.sm,
        marginTop: SPACING.sm,
    },
    genderOption: {
        flex: 1,
        height: 44,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.divider,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background.surface,
    },
    genderOptionActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    fakeSlider: {
        height: 40,
        justifyContent: 'center',
    },
    sliderTrack: {
        height: 6,
        backgroundColor: COLORS.primary,
        borderRadius: 3,
        position: 'absolute',
        left: 0,
    },
    sliderThumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.background.main,
        borderWidth: 2,
        borderColor: COLORS.primary,
        position: 'absolute',
        marginTop: -12,
        elevation: 2,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    applyButton: {
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: RADIUS.full,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});
