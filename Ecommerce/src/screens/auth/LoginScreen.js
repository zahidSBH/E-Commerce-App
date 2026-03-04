import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

import FormInput from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import useAuth from "@/hooks/useAuth";
import authValidation from "@/validation/authValidation";
import AuthRoutes from "@/enums/AuthRoutes";
import theme from "@/constants/theme";

const LoginScreen = ({ navigation = null }) => {
  const { login, loading, error, clearError } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await login(data);
  };

  const navigateToSignUp = () => {
    clearError();
    navigation?.navigate(AuthRoutes.SIGN_UP);
  };

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue shopping</Text>
    </View>
  );

  const FirebaseError = () => {
    if (!error) return null;
    return <Text style={styles.firebaseError}>{error}</Text>;
  };

  const EmailField = () => (
    <Controller
      control={control}
      name="email"
      rules={authValidation.email}
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
      rules={authValidation.password}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormInput
          label="Password"
          placeholder="Enter your password"
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
      <Text style={styles.footerText}>Don't have an account? </Text>
      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.footerLink}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <FirebaseError />
        <EmailField />
        <PasswordField />
        <PrimaryButton
          label="Log In"
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
    alignItems: "center",
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
    textAlign: "center",
  },
  firebaseError: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.error,
    textAlign: "center",
    marginBottom: theme.spacing.md,
    backgroundColor: "#FFEBEE",
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
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

export default LoginScreen;
