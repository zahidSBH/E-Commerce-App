import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const OrderSuccessHeader = () => {
  return (
    <>
      <View style={styles.successIcon}>
        <Ionicons
          name="checkmark-circle"
          size={styles.iconSize}
          color={theme.colors.success}
        />
      </View>

      <Text style={styles.title}>Order Placed!</Text>

      <Text style={styles.subtitle}>
        Your order has been placed successfully.
      </Text>
    </>
  );
};

const ICON_SIZE = theme.sizes.iconCircleXL * 0.8;

const styles = StyleSheet.create({
  successIcon: {
    width: theme.sizes.iconCircleXL,
    height: theme.sizes.iconCircleXL,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.successFaded,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.sm,
  },

  iconSize: ICON_SIZE,

  title: {
    fontSize: theme.typography.fontSizeXXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },

  subtitle: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },
});

export default OrderSuccessHeader;
