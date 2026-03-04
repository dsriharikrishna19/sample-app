import { useColorScheme } from 'react-native';
import { LIGHT_COLORS, DARK_COLORS, ThemeColors } from '../theme/colors';

export const useTheme = (): ThemeColors => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return isDark ? DARK_COLORS : LIGHT_COLORS;
};

export const useIsDark = () => {
    return useColorScheme() === 'dark';
};
