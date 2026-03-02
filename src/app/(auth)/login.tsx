import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../../schemas/authSchema';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { RootState, AppDispatch } from '../../store/store';
import { useRouter } from 'expo-router';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';

export default function LoginScreen() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            mobile: '',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        // For demo purposes, we'll just navigate if API fails or mock it
        // try {
        //   await dispatch(login(data)).unwrap();
        //   router.replace('/(tabs)/home');
        // } catch (e) {
        //   // Navigation for demo
        //   router.replace('/(tabs)/home');
        // }
        router.replace('/pages/home');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to continue</Text>
                </View>

                <View style={styles.form}>
                    <FormInput
                        control={control}
                        name="mobile"
                        label="Mobile Number"
                        placeholder="Enter your mobile number"
                        keyboardType="numeric"
                    />

                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <Button
                        title="Login"
                        onPress={handleSubmit(onSubmit)}
                        loading={loading}
                        style={styles.button}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                            <Text style={styles.link}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.main,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: SPACING.lg,
    },
    header: {
        marginBottom: SPACING.xl,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text.primary,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.text.secondary,
        marginTop: SPACING.xs,
    },
    form: {
        width: '100%',
    },
    button: {
        marginTop: SPACING.md,
    },
    errorText: {
        color: COLORS.error,
        textAlign: 'center',
        marginBottom: SPACING.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING.lg,
    },
    footerText: {
        color: COLORS.text.secondary,
    },
    link: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
});
