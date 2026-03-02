import React from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform
} from 'react-native';
import AppText from './AppText';
import { COLORS } from '../theme/colors';
import { SPACING, RADIUS } from '../theme/spacing';

export interface PopoverOption {
    label: string;
    color?: string;
    onPress: () => void;
}

interface PopoverMenuProps {
    visible: boolean;
    onClose: () => void;
    options: PopoverOption[];
}

export default function PopoverMenu({ visible, onClose, options }: PopoverMenuProps) {
    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {options.map((option, index) => (
                            <React.Fragment key={index}>
                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => {
                                        onClose();
                                        setTimeout(option.onPress, 300); // Wait for modal to close
                                    }}
                                >
                                    <AppText
                                        variant="body"
                                        style={option.color ? { color: option.color } : { color: COLORS.text.primary }}
                                    >
                                        {option.label}
                                    </AppText>
                                </TouchableOpacity>
                                {index < options.length - 1 && <View style={styles.menuSeparator} />}
                            </React.Fragment>
                        ))}
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    modalContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 100 : 70, // Adjust this as needed based on header height
        right: SPACING.md,
        width: 180,
        backgroundColor: COLORS.background.main,
        borderRadius: RADIUS.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: COLORS.divider,
        zIndex: 1000,
    },
    modalContent: {
        borderRadius: RADIUS.md,
        overflow: 'hidden',
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: SPACING.md,
    },
    menuSeparator: {
        height: 1,
        backgroundColor: COLORS.divider,
    },
});
