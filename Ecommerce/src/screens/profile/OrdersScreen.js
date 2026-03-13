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
import OrderListEmptyState from "@/components/order/OrderListEmptyState";
import OrderListErrorState from "@/components/order/OrderListErrorState";
import OrderListLoadingState from "@/components/order/OrderListLoadingState";
import OrderListFooterLoading from "@/components/order/OrderListFooterLoading";
import useOrder from "@/hooks/useOrder";
import SliceStatus from "@/enums/SliceStatus";
import theme from "@/constants/theme";

const OrdersScreen = ({ navigation = {} }) => {
  const { orderHistory, status, error, loadOrderHistory, hasMore } = useOrder();
  const isLoading = status === SliceStatus.LOADING;
  const isFailed = status === SliceStatus.FAILED;

  useEffect(() => {
    loadOrderHistory("", true);
  }, [loadOrderHistory]);

  const handleRefresh = useCallback(() => {
    loadOrderHistory("", true);
  }, [loadOrderHistory]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoading && !isFailed) {
      loadOrderHistory();
    }
  }, [hasMore, isLoading, isFailed, loadOrderHistory]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderOrderItem = useCallback(({ item }) => (
    <OrderItem item={item} />
  ), []);

  const keyExtractor = useCallback((item) => item.id || item.invoiceNumber, []);

  const isInitialLoading = status === SliceStatus.LOADING && orderHistory.length === 0;
  const isInitialError = status === SliceStatus.FAILED && orderHistory.length === 0;

  const renderEmptyState = useCallback(() => <OrderListEmptyState />, []);
  const renderFooterLoading = useCallback(() => (
    <OrderListFooterLoading 
      hasMore={hasMore} 
      orderCount={orderHistory.length} 
      isFailed={isFailed} 
    />
  ), [hasMore, orderHistory.length, isFailed]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScreenHeader title="My Orders" onBackPress={handleBack} />

      {isInitialLoading ? (
        <OrderListLoadingState />
      ) : isInitialError ? (
        <OrderListErrorState error={error} onRefresh={handleRefresh} />
      ) : (
        <FlatList
          data={orderHistory}
          keyExtractor={keyExtractor}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
          ListFooterComponent={renderFooterLoading}
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefresh}
          refreshing={isLoading && orderHistory.length > 0}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
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
});

export default OrdersScreen;
