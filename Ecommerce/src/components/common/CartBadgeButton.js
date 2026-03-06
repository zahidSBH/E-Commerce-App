import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const getDisplayCount = (count = 0) => {
  const safeCount = Number(count) || 0;

  if (safeCount > 99) {
    return "99+";
  }

  return safeCount;
};

const BadgeCount = ({ count = 0 }) => {
  const safeCount = Number(count) || 0;

  if (safeCount <= 0) {
    return null;
  }

  const displayCount = getDisplayCount(safeCount);

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{displayCount}</Text>
    </View>
  );
};

const CartBadgeButton = ({ cartCount = 0, onPress = () => {} }) => {
  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <Ionicons name="bag-outline" size={22} color={theme.colors.textPrimary} />
      <BadgeCount count={cartCount} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    width: theme.sizes.iconButton,
    height: theme.sizes.iconButton,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    minWidth: theme.sizes.badge,
    height: theme.sizes.badge,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xs,
  },
  badgeText: {
    fontSize: theme.typography.fontSizeXXS,
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeightBold,
  },
});

export default CartBadgeButton;
