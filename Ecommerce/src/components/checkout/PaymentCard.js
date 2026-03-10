import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import theme from "@/constants/theme";

const PaymentCard = ({
  option = {},
  isSelected = false,
  onPress = () => {},
}) => {
  const handlePress = () => onPress(option?.method);

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconBox, isSelected && styles.iconBoxSelected]}>
        <Ionicons
          name={option?.icon}
          size={theme.iconSizes.md}
          color={isSelected ? theme.colors.white : theme.colors.textSecondary}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.label}>{option?.label}</Text>
        <Text style={styles.description}>{option?.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: theme.borderWidth.md,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },

  cardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryFaded,
  },

  iconBox: {
    width: theme.sizes.iconButton,
    height: theme.sizes.iconButton,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  iconBoxSelected: {
    backgroundColor: theme.colors.primary,
  },

  textContainer: {
    flex: 1,
  },

  label: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
  },

  description: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textMuted,
  },
});

export default PaymentCard;