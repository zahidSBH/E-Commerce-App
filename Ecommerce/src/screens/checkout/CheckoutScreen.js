import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

import ScreenHeader from "@/components/common/ScreenHeader";
import AddressForm from "@/components/checkout/AddressForm";
import PaymentSelector from "@/components/checkout/PaymentSelector";

import useOrder from "@/hooks/useOrder";

import PaymentMethod from "@/enums/PaymentMethod";
import CheckoutRoutes from "@/enums/CheckoutRoutes";

import { checkoutValidation } from "@/validation/checkoutValidation";

import theme from "@/constants/theme";

const CheckoutScreen = ({ navigation }) => {
  const {
    paymentMethod = PaymentMethod.CASH_ON_DELIVERY,
    transactionId = "",
    saveAddress,
    selectPayment,
    saveTransactionId,
  } = useOrder();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      street: "",
      city: "",
      zip: "",
    },
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  const navigateToOrderPreview = () => {
    navigation.navigate(CheckoutRoutes.ORDER_PREVIEW);
  };

  const isOnlinePayment = paymentMethod === PaymentMethod.ONLINE;
  const isTransactionEmpty = !transactionId.trim();

  const getTransactionError = () => {
    if (isOnlinePayment && isTransactionEmpty) {
      return checkoutValidation.transactionId.required;
    }

    return "";
  };

  const transactionError = getTransactionError();

  const handleCheckoutSubmit = (formData) => {
    if (isOnlinePayment && isTransactionEmpty) {
      return;
    }

    saveAddress(formData);
    navigateToOrderPreview();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScreenHeader title="Checkout" onBackPress={handleBackPress} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AddressForm control={control} errors={errors} />

          <View style={styles.divider} />

          <PaymentSelector
            selectedMethod={paymentMethod}
            transactionId={transactionId}
            onMethodChange={selectPayment}
            onTransactionIdChange={saveTransactionId}
            transactionError={transactionError}
          />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleCheckoutSubmit)}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Review Order</Text>

            <Ionicons
              name="arrow-forward"
              size={theme.iconSizes.sm}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  flex: {
    flex: 1,
  },

  scrollContent: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
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

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.md,
  },

  buttonText: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.white,
  },
});

export default CheckoutScreen;
