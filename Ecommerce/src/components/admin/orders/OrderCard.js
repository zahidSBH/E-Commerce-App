import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "@/constants/theme";
import OrderStatus from "@/enums/OrderStatus";
import formatDate from "@/utils/formatDate";

const getStatusColor = (status) => {
  switch (status) {
    case OrderStatus.DELIVERED:
      return { text: theme.colors.success, bg: theme.colors.success + "20" };
    case OrderStatus.CANCELLED:
      return { text: theme.colors.error, bg: theme.colors.error + "20" };
    case OrderStatus.SHIPPED:
      return { text: theme.colors.primary, bg: theme.colors.primary + "20" };
    case OrderStatus.PROCESSING:
      return { text: theme.colors.info, bg: theme.colors.infoFaded };
    default:
      return {
        text: theme.colors.textSecondary,
        bg: theme.colors.textSecondary + "20",
      };
  }
};

const OrderCard = ({ item = {}, onPress }) => {
  const {
    invoiceNumber,
    status,
    placedAt,
    items,
    total,
  } = item ?? {};

  const statusStyles = getStatusColor(status);
  const itemsCount = (items ?? []).length;
  const totalAmount = (total ?? 0).toFixed(2);

  return (
    <TouchableOpacity style={styles.orderCard} onPress={onPress}>
      <View style={styles.orderHeader}>
        <Text style={styles.invoiceNumber}>{invoiceNumber ?? "N/A"}</Text>
        <View
          style={[styles.statusBadge, { backgroundColor: statusStyles.bg }]}
        >
          <Text style={[styles.statusText, { color: statusStyles.text }]}>
            {status ?? "Pending"}
          </Text>
        </View>
      </View>

      <View style={styles.orderFooter}>
        <View>
          <Text style={styles.dateText}>{formatDate(placedAt)}</Text>
          <Text style={styles.itemCount}>
            {itemsCount} {itemsCount === 1 ? "Item" : "Items"}
          </Text>
        </View>
        <Text style={styles.totalAmount}>${totalAmount}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderCard: {
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
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  invoiceNumber: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    fontSize: theme.typography.fontSizeXS,
    fontWeight: theme.typography.fontWeightSemiBold,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.sm,
  },
  dateText: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textSecondary,
  },
  itemCount: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textMuted,
  },
  totalAmount: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
  },
});

export default React.memo(OrderCard);
