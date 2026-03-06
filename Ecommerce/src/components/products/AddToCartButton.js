import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const AddToCartButton = ({
  isInCart = false,
  onPress = () => {},
}) => {
  const iconName = isInCart ? "bag-check" : "bag-add-outline";
  const label = isInCart ? "Go to Cart" : "Add to Cart";

  return (
    <TouchableOpacity
      style={[styles.button, isInCart && styles.buttonActive]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Ionicons
        name={iconName}
        size={theme.iconSizes.md}
        color={theme.colors.white}
      />

      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.md,
  },
  buttonActive: {
    backgroundColor: theme.colors.primaryDark,
  },
  text: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.white,
  },
});

export default AddToCartButton;