import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const OrderCustomerCard = ({ customer = {}, loading = false }) => {
  const { fullName, email } = customer ?? {};

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons
          name="person-outline"
          size={theme.iconSizes.sm}
          color={theme.colors.primary}
        />
        <Text style={styles.sectionTitle}>Customer Account</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.primary} />
      ) : (
        <>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>{fullName ?? "Guest"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{email ?? "N/A"}</Text>
          </View>
        </>
      )}
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

export default React.memo(OrderCustomerCard);
