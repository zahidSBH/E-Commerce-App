import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Section from "@/components/order/Section";
import InfoRow from "@/components/order/InfoRow";
import theme from "@/constants/theme";

const SummarySection = ({ subtotal = 0, deliveryFee = 0, total = 0 }) => {
  return (
    <Section title="Price Summary">
      <InfoRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
      <InfoRow label="Delivery Fee" value={`$${deliveryFee.toFixed(2)}`} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xs,
    borderTopWidth: theme.borderWidth.sm,
    borderTopColor: theme.colors.border,
    marginTop: theme.spacing.xs,
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
});

export default SummarySection;
