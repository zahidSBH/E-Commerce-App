import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const OrderListErrorState = ({ error = "", onRefresh = () => {} }) => (
  <View style={styles.emptyContainer}>
    <View style={[styles.emptyIconWrapper, { backgroundColor: theme.colors.errorFaded }]}>
      <Ionicons
        name="alert-circle-outline"
        size={50}
        color={theme.colors.error}
      />
    </View>
    <Text style={styles.emptyTitle}>Oops! Something went wrong</Text>
    <Text style={styles.emptySubtitle}>{error || "Failed to load orders."}</Text>
    <Text 
      onPress={onRefresh}
      style={[
        styles.emptySubtitle, 
        { 
          color: theme.colors.primary, 
          marginTop: theme.spacing.md, 
          fontWeight: theme.typography.fontWeightBold 
        }
      ]}
    >
      Try Again
    </Text>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.xxl,
  },
  emptyIconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: theme.typography.fontSizeXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default React.memo(OrderListErrorState);
