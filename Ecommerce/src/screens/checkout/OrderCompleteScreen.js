import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import useOrder from "@/hooks/useOrder";
import TabRoutes from "@/enums/TabRoutes";

import OrderSuccessHeader from "@/components/order/OrderSuccessHeader";
import OrderSummaryCard from "@/components/order/OrderSummaryCard";

import theme from "@/constants/theme";

const OrderCompleteScreen = ({ navigation }) => {
  const { currentOrder, resetOrder } = useOrder();

  const handleGoHome = () => {
    resetOrder();
    navigation.navigate("Tabs", { screen: TabRoutes.HOME });
  };

  const invoiceNumber = currentOrder?.invoiceNumber ?? "";
  const paymentMethod = currentOrder?.paymentMethod ?? "";
  const estimatedDelivery = currentOrder?.estimatedDelivery ?? "";

  const formattedTotal =
    currentOrder?.total !== undefined
      ? `$${currentOrder.total.toFixed(2)}`
      : "";

  const hasOrder = Boolean(currentOrder);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <OrderSuccessHeader />

        {hasOrder && (
          <OrderSummaryCard
            invoiceNumber={invoiceNumber}
            paymentMethod={paymentMethod}
            total={formattedTotal}
            estimatedDelivery={estimatedDelivery}
          />
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={handleGoHome}
          activeOpacity={theme.opacity.buttonPress}
        >
          <Ionicons
            name="home-outline"
            size={theme.iconSizes.md}
            color={theme.colors.white}
          />
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    gap: theme.spacing.md,
  },

  footer: {
    padding: theme.spacing.md,
    borderTopWidth: theme.borderWidth.sm,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },

  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.md,
  },

  homeButtonText: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.white,
  },
});

export default OrderCompleteScreen;