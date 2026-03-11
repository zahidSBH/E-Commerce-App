import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const OrderShippingCard = ({ address = {} }) => {
  const {
    fullName,
    phone,
    street,
    city,
    zip,
  } = address ?? {};

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons
          name="location-outline"
          size={theme.iconSizes.sm}
          color={theme.colors.primary}
        />
        <Text style={styles.sectionTitle}>Shipping Address</Text>
      </View>
      <Text style={styles.addressText}>{fullName ?? "N/A"}</Text>
      <Text style={styles.addressText}>{phone ?? "N/A"}</Text>
      <Text style={styles.addressText}>{street ?? "N/A"}</Text>
      <Text style={styles.addressText}>
        {city ?? "N/A"}, {zip ?? "N/A"}
      </Text>
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
  addressText: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
});

export default React.memo(OrderShippingCard);
