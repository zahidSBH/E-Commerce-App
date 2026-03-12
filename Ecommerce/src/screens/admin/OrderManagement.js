import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";
import AdminRoutes from "@/enums/AdminRoutes";
import ScreenHeader from "@/components/common/ScreenHeader";
import {
  fetchAllAdminOrders,
  selectAdminOrders,
  selectOrderStatus,
} from "@/store/slices/orderSlice";
import SliceStatus from "@/enums/SliceStatus";

 
import OrderCard from "@/components/admin/orders/OrderCard";

const OrderManagement = ({ navigation }) => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAdminOrders);
  const status = useSelector(selectOrderStatus);

  useEffect(() => {
    dispatch(fetchAllAdminOrders());
  }, [dispatch]);

  const renderOrderItem = ({ item }) => (
    <OrderCard
      item={item}
      onPress={() =>
        navigation.navigate(AdminRoutes.ORDER_DETAILS, {
          orderId: item.id,
        })
      }
    />
  );

  if (status === SliceStatus.LOADING && orders.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Manage Orders"
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="receipt-outline"
              size={64}
              color={theme.colors.textMuted}
            />
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        }
        refreshing={status === SliceStatus.LOADING}
        onRefresh={() => dispatch(fetchAllAdminOrders())}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.xxl,
  },
  emptyText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textMuted,
  },
});

export default OrderManagement;
