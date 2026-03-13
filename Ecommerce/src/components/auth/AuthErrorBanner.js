import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const DISABLED_ERROR =
  "Your account has been disabled. Please contact support.";

const isDisabledError = (message = "") => message === DISABLED_ERROR;

const AuthErrorBanner = ({ message = "" }) => {
  if (!message) return null;

  const disabled = isDisabledError(message);

  return (
    <View style={[styles.container, styles.banner]} accessibilityRole="alert">
      <Ionicons
        name={disabled ? "ban-outline" : "alert-circle-outline"}
        size={theme.iconSizes.sm}
        color={theme.colors.error}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: theme.borderWidth.sm,
  },
  banner: {
    backgroundColor: theme.colors.errorFaded,
    borderColor: theme.colors.error,
  },
  text: {
    flex: 1,
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.error,
  },
});

export default AuthErrorBanner;