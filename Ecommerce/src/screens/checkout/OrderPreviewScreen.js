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

import ScreenHeader from "@/components/common/ScreenHeader";
import useOrder from "@/hooks/useOrder";
import useCart from "@/hooks/useCart";

import ItemsSection from "@/components/order/ItemsSection";
import AddressSection from "@/components/order/AddressSection";
import PaymentSection from "@/components/order/PaymentSection";
import SummarySection from "@/components/order/SummarySection";

import CheckoutRoutes from "@/enums/CheckoutRoutes";
import theme from "@/constants/theme";

const OrderPreviewScreen = ({ navigation }) => {
  const {
    address = {},
    paymentMethod = "",
    transactionId = "",
    subtotal = 0,
    deliveryFee = 0,
    total = 0,
    submitOrder,
  } = useOrder();

  const { cartItems = [], emptyCart } = useCart();

  const handlePlaceOrder = () => {
    submitOrder();
    emptyCart();
    navigation.navigate(CheckoutRoutes.ORDER_COMPLETE);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScreenHeader onBackPress={handleBack} title="Order Review" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ItemsSection cartItems={cartItems} />
        <View style={styles.divider} />

        <AddressSection address={address} />
        <View style={styles.divider} />

        <PaymentSection
          paymentMethod={paymentMethod}
          transactionId={transactionId}
        />
        <View style={styles.divider} />

        <SummarySection
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeButton}
          onPress={handlePlaceOrder}
          activeOpacity={0.85}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={theme.iconSizes.md}
            color={theme.colors.white}
          />
          <Text style={styles.placeButtonText}>Place Order</Text>
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
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  divider: {
    height: theme.borderWidth.sm,
    backgroundColor: theme.colors.border,
  },
  footer: {
    padding: theme.spacing.md,
    borderTopWidth: theme.borderWidth.sm,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  placeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.md,
  },
  placeButtonText: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.white,
  },
});

export default OrderPreviewScreen;
