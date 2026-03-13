import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getStatusColor, getStatusBgColor, formatDate } from "@/utils/userDetailHelpers";
import theme from "@/constants/theme";

const OrderHistoryItem = React.memo(({ order = {} }) => {
  const statusColor = getStatusColor(order.status);
  const statusBgColor = getStatusBgColor(order.status);
  const invoiceNumber = order.invoiceNumber ?? "—";

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.invoice}>{invoiceNumber}</Text>
        <Text style={styles.date}>{formatDate(order.placedAt)}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.total}>${order.total?.toFixed(2)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {order.status}
          </Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.xs,
  },
  left: {
    gap: 2,
  },
  right: {
    alignItems: "flex-end",
    gap: 4,
  },
  invoice: {
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
  },
  date: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textMuted,
  },
  total: {
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    fontSize: theme.typography.fontSizeXS,
    fontWeight: theme.typography.fontWeightSemiBold,
  },
});

export default OrderHistoryItem;
