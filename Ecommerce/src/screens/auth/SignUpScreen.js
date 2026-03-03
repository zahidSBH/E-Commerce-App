import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import FormInput from '@/components/FormInput';
import PrimaryButton from '@/components/PrimaryButton';
import useAuth from '@/hooks/useAuth';
import validationRules from '@/constants/validationRules';
import AuthRoutes from '@/enums/AuthRoutes';
import theme from '@/constants/theme';

const SignUpScreen = ({ navigation = null }) => {
  const { signUp, loading, error, clearError } = useAuth();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const result = await signUp(data);
    if (result.error) return;
  };

  const navigateToLogin = () => {
    clearError();
    navigation?.navigate(AuthRoutes.LOGIN);
  };

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Join Us</Text>
      <Text style={styles.subtitle}>
        Create an account to start shopping our curated collection
      </Text>
    </View>
  );

  const FirebaseError = () => {
    if (!error) return null;
    return <Text style={styles.firebaseError}>{error}</Text>;
  };

  const FullNameField = () => (
    <Controller
      control={control}
      name="fullName"
      rules={validationRules.fullName}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormInput
          label="Full Name"
          placeholder="John Doe"
          autoCapitalize="words"
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={errors.fullName?.message ?? null}
        />
      )}
    />
  );

  const EmailField = () => (
    <Controller
      control={control}
      name="email"
      rules={validationRules.email}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormInput
          label="Email Address"
          placeholder="example@mail.com"
          keyboardType="email-address"
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={errors.email?.message ?? null}
        />
      )}
    />
  );

  const PasswordField = () => (
    <Controller
      control={control}
      name="password"
      rules={validationRules.password}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormInput
          label="Password"
          placeholder="Min 8 chars, 1 uppercase, 1 number"
          secureTextEntry
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={errors.password?.message ?? null}
        />
      )}
    />
  );

  const Footer = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Already have an account? </Text>
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.footerLink}>Log In</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <FirebaseError />
        <FullNameField />
        <EmailField />
        <PasswordField />
        <PrimaryButton
          label="Sign Up"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          showArrow
        />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSizeXXL + 4,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  firebaseError: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    backgroundColor: '#FFEBEE',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
  },
  footerText: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textSecondary,
  },
  footerLink: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeightSemiBold,
  },
});

export default SignUpScreen;