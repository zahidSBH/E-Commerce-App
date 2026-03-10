import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const SummaryRow = ({ label = "", value = "", isTotal = false }) => (
  <View style={styles.summaryRow}>
    <Text style={[styles.summaryLabel, isTotal && styles.totalLabel]}>
      {label}
    </Text>
    <Text style={[styles.summaryValue, isTotal && styles.totalValue]}>
      {value}
    </Text>
  </View>
);

const CartSummary = ({
  subtotal = 0,
  deliveryFee = 0,
  total = 0,
  onCheckout = () => {},
}) => {
  const subtotalValue = `$${subtotal.toFixed(2)}`;
  const deliveryValue = `$${deliveryFee.toFixed(2)}`;
  const totalValue = `$${total.toFixed(2)}`;

  return (
    <View style={styles.container}>
      <SummaryRow label="Subtotal" value={subtotalValue} />
      <SummaryRow label="Delivery Fee" value={deliveryValue} />

      <View style={styles.divider} />

      <SummaryRow label="Total" value={totalValue} isTotal />

      <TouchableOpacity
        style={styles.button}
        onPress={onCheckout}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Proceed to Checkout</Text>

        <Ionicons
          name="arrow-forward"
          size={theme.iconSizes.sm}
          color={theme.colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: theme.elevation.lg,
    elevation: theme.elevation.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textSecondary,
  },
  summaryValue: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeightSemiBold,
  },
  totalLabel: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  totalValue: {
    fontSize: theme.typography.fontSizeXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
  },
  divider: {
    height: theme.borderWidth.sm,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xs,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  buttonText: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.white,
  },
});

export default CartSummary;
