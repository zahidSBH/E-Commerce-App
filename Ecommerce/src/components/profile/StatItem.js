import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const StatItem = ({
  icon = "cube-outline",
  label = "",
  value = "0",
  onPress = null,
  highlight = false,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    disabled={!onPress}
  >
    <Ionicons
      name={icon}
      size={theme.iconSizes.md}
      color={highlight ? theme.colors.primary : theme.colors.textMuted}
    />
    <Text style={[styles.value, highlight && styles.highlightValue]}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: theme.spacing.xs,
    flex: 1,
  },
  value: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  highlightValue: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSizeXL,
  },
  label: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
});

export default StatItem;
