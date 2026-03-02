import { useWindowDimensions } from 'react-native';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';

export const BREAKPOINTS = {
    sm: 360,
    md: 420,
    lg: 720,
};

export const useResponsive = () => {
    const { width, height } = useWindowDimensions();

    const breakpoint: Breakpoint =
        width < BREAKPOINTS.sm ? 'xs' :
            width < BREAKPOINTS.md ? 'sm' :
                width < BREAKPOINTS.lg ? 'md' : 'lg';

    const isTablet = width >= BREAKPOINTS.lg;
    const isSmallPhone = width < BREAKPOINTS.sm;

    // Helper to scale values based on width
    const scale = (size: number) => (width / 375) * size;

    return {
        width,
        height,
        breakpoint,
        isTablet,
        isSmallPhone,
        scale,
        isLandscape: width > height,
    };
};
