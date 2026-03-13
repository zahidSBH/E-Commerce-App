import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import theme from "@/constants/theme";

const OrderListFooterLoading = ({ hasMore = false, orderCount = 0, isFailed = false }) => {
  if (!hasMore || orderCount === 0 || isFailed) return null;
  return (
    <View style={styles.footerLoader}>
      <ActivityIndicator size="small" color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  footerLoader: {
    paddingVertical: theme.spacing.md,
    alignItems: "center",
  },
});

export default React.memo(OrderListFooterLoading);
