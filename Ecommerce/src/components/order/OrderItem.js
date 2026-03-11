import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "@/constants/theme";
import OrderStatus from "@/enums/OrderStatus";
import formatDate from "@/utils/formatDate";

const getStatusColor = (status) => {
  switch (status) {
    case OrderStatus.DELIVERED:
      return { text: theme.colors.successDark, bg: theme.colors.successFaded };
    case OrderStatus.CANCELLED:
      return { text: theme.colors.error, bg: theme.colors.errorFaded };
    case OrderStatus.SHIPPED:
      return { text: theme.colors.primary, bg: theme.colors.primaryFaded };
    case OrderStatus.PROCESSING:
      return { text: theme.colors.info, bg: theme.colors.infoFaded };
    default:
      return { text: theme.colors.textSecondary, bg: theme.colors.surface };
  }
};

const OrderItem = ({ item = {} }) => {
  const {
    invoiceNumber,
    status,
    placedAt,
    items,
    total,
  } = item ?? {};

  const itemsCount = (items ?? []).length;
  const itemCountText = `${itemsCount} ${itemsCount === 1 ? "item" : "items"}`;
  const totalAmount = (total ?? 0).toFixed(2);
  const formattedDate = formatDate(placedAt);

  const statusStyle = getStatusColor(status);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.invoiceNo}>{invoiceNumber ?? "N/A"}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.statusText, { color: statusStyle.text }]}>
            {status ?? "Pending"}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <Text style={styles.itemsCount}>{itemCountText}</Text>
        <Text style={styles.totalAmount}>${totalAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.sm,
  },
  invoiceNo: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  date: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: theme.typography.fontWeightBold,
    textTransform: "uppercase",
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemsCount: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.textSecondary,
  },
  totalAmount: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
  },
});

export default React.memo(OrderItem);
