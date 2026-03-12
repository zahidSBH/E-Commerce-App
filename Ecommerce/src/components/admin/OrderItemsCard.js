import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const OrderItemsCard = ({ items = [], total = 0 }) => {
  const safeItems = items ?? [];
  const safeTotal = (total ?? 0).toFixed(2);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons
          name="cart-outline"
          size={theme.iconSizes.sm}
          color={theme.colors.primary}
        />
        <Text style={styles.sectionTitle}>Order Items</Text>
      </View>
      {safeItems.map((item, index) => {
        const { name, quantity, price } = item ?? {};
        const safeQuantity = quantity ?? 1;
        const safePrice = price ?? 0;

        return (
          <View key={index} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{name ?? "Unknown Item"}</Text>
              <Text style={styles.itemQuantity}>Qty: {safeQuantity}</Text>
            </View>
            <Text style={styles.itemPrice}>
              ${(safePrice * safeQuantity).toFixed(2)}
            </Text>
          </View>
        );
      })}
      <View style={styles.divider} />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalValue}>${safeTotal}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: theme.elevation.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.colors.textPrimary,
  },
  itemQuantity: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textMuted,
  },
  itemPrice: {
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  totalLabel: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  totalValue: {
    fontSize: theme.typography.fontSizeXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
  },
});

export default React.memo(OrderItemsCard);
