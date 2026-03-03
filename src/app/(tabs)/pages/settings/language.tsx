import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { ChevronLeft, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AppText from '../../../../components/AppText';
import { COLORS } from '../../../../theme/colors';
import { SPACING, RADIUS } from '../../../../theme/spacing';
import { TYPOGRAPHY } from '../../../../theme/typography';

const LANGUAGES = ['English', 'Spanish', 'French', 'Hindi', 'German', 'Japanese'];

export default function LanguageScreen() {
    const router = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const handleSelectLanguage = (lang: string) => {
        setSelectedLanguage(lang);
        // In a real app, this is where you'd dispatch an action or change i18n context
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft color={COLORS.text.primary} size={28} />
                </TouchableOpacity>
                <AppText variant="h2" style={styles.title}>Language</AppText>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    {LANGUAGES.map((lang, index) => (
                        <View key={lang}>
                            <TouchableOpacity
                                style={styles.languageOption}
                                onPress={() => handleSelectLanguage(lang)}
                            >
                                <AppText
                                    variant="body"
                                    color={selectedLanguage === lang ? COLORS.primary : COLORS.text.primary}
                                    weight={selectedLanguage === lang ? 'bold' : 'regular'}
                                >
                                    {lang}
                                </AppText>
                                {selectedLanguage === lang && <Check color={COLORS.primary} size={20} />}
                            </TouchableOpacity>
                            {index < LANGUAGES.length - 1 && <View style={styles.divider} />}
                        </View>
                    ))}
                </View>
            </ScrollView>
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
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
    },
    backButton: {
        marginRight: SPACING.md,
    },
    title: {
        fontWeight: TYPOGRAPHY.weight.bold,
    },
    content: {
        padding: SPACING.lg,
    },
    card: {
        backgroundColor: COLORS.background.card,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.divider,
        overflow: 'hidden',
    },
    languageOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.lg,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.divider,
        marginLeft: SPACING.lg,
    },
});
