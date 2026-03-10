import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import InfoRow from "@/components/order/InfoRow";
import theme from "@/constants/theme";

const OrderSummaryCard = ({
  invoiceNumber = "",
  paymentMethod = "",
  total = "",
  estimatedDelivery = "",
}) => {
  return (
    <View style={styles.card}>
      <InfoRow label="Invoice Number" value={invoiceNumber} />

      <View style={styles.divider} />

      <InfoRow label="Payment Method" value={paymentMethod} />

      <InfoRow label="Total Amount" value={total} />

      <View style={styles.divider} />

      <InfoRow label="Estimated Delivery" value={estimatedDelivery} />

      <View style={styles.deliveryNote}>
        <Ionicons
          name="time-outline"
          size={theme.iconSizes.sm}
          color={theme.colors.primary}
        />
        <Text style={styles.deliveryNoteText}>
          Usually delivered within 3–5 business days
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: theme.spacing.xs },
    shadowOpacity: theme.opacity.shadow,
    shadowRadius: theme.spacing.sm,
    elevation: theme.elevation.card,
  },

  divider: {
    height: theme.borderWidth.sm,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xs,
  },

  deliveryNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.primaryFaded,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.xs,
  },

  deliveryNoteText: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.primary,
    flex: 1,
  },
});

export default OrderSummaryCard;
