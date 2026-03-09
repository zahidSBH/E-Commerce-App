import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const LogoutButton = ({ onPress = () => {}, loading = false }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
    activeOpacity={0.75}
    disabled={loading}
  >
    <Ionicons
      name="log-out-outline"
      size={theme.iconSizes.sm}
      color={theme.colors.error}
    />
    <Text style={styles.text}>{loading ? "Signing out..." : "Log Out"}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    width: "100%",
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.errorFaded,
  },
  text: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.error,
  },
});

export default LogoutButton;
