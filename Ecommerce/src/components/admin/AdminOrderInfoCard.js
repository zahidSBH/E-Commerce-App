import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "@/constants/theme";
import formatDate from "@/utils/formatDate";

const AdminOrderInfoCard = ({ order = {} }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Order Information</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Invoice:</Text>
      <Text style={styles.infoValue}>{order?.invoiceNumber || "N/A"}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Placed On:</Text>
      <Text style={styles.infoValue}>
        {formatDate(order?.placedAt, true)}
      </Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Payment:</Text>
      <Text style={styles.infoValue}>{order?.paymentMethod || "N/A"}</Text>
    </View>
  </View>
);

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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xs,
  },
  infoLabel: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.textSecondary,
  },
  infoValue: {
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
  },
});

export default React.memo(AdminOrderInfoCard);
