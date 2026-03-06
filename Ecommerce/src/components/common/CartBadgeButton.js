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
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeightBold,
  },
});

export default CartBadgeButton;
