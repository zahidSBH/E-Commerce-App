import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import ScreenHeader from "@/components/common/ScreenHeader";
import OrderItem from "@/components/order/OrderItem";
import useOrder from "@/hooks/useOrder";
import SliceStatus from "@/enums/SliceStatus";
import theme from "@/constants/theme";

const OrdersScreen = ({ navigation }) => {
  const { orderHistory, status, loadOrderHistory } = useOrder();

  useEffect(() => {
    loadOrderHistory();
  }, [loadOrderHistory]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderOrderItem = useCallback(({ item }) => (
    <OrderItem item={item} />
  ), []);

  const keyExtractor = useCallback((item) => item.id || item.invoiceNumber, []);

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconWrapper}>
        <Ionicons
          name="bag-handle-outline"
          size={50}
          color={theme.colors.textMuted}
        />
      </View>
      <Text style={styles.emptyTitle}>No orders yet</Text>
      <Text style={styles.emptySubtitle}>
        Manage your orders and view their history here once you place them.
      </Text>
    </View>
  );

  const LoadingState = () => (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );

  const isInitialLoading = status === SliceStatus.LOADING && orderHistory.length === 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScreenHeader title="My Orders" onBackPress={handleBack} />

      {isInitialLoading ? (
        <LoadingState />
      ) : (
        <FlatList
          data={orderHistory}
          keyExtractor={keyExtractor}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
          onRefresh={loadOrderHistory}
          refreshing={status === SliceStatus.LOADING}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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

export default OrdersScreen;
