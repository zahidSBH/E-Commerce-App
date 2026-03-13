import React, { useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

import FormInput from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import LoginHeader from "@/components/auth/LoginHeader";
import AuthErrorBanner from "@/components/auth/AuthErrorBanner";
import AuthFooter from "@/components/auth/AuthFooter";

import useAuth from "@/hooks/useAuth";
import { authValidation } from "@/validation/authValidation";
import AuthRoutes from "@/enums/AuthRoutes";
import theme from "@/constants/theme";

const LoginScreen = ({ navigation = {}, initialError = null }) => {
  const { login, loading, error, clearError } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const activeError = initialError ?? error ?? "";

  const onSubmit = useCallback(
    async (data = {}) => {
      await login(data);
    },
    [login]
  );

  const handleNavigateToSignUp = useCallback(() => {
    clearError();
    navigation.navigate?.(AuthRoutes.SIGN_UP);
  }, [clearError, navigation]);

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
        <LoginHeader />

        <AuthErrorBanner message={activeError} />

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

        <PrimaryButton
          label="Log In"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          showArrow
        />

        <AuthFooter onPress={handleNavigateToSignUp} />
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
    gap: theme.spacing.md,
  },
});

export default LoginScreen;