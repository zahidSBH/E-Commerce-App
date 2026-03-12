import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "@/constants/theme";

const LoginHeader = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Welcome Back</Text>
    <Text style={styles.subtitle}>Sign in to continue shopping</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.fontSizeXXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
});

export default LoginHeader;