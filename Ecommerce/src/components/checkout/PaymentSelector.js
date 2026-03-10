import React from "react";
import { View, Text, StyleSheet } from "react-native";

import PaymentCard from "./PaymentCard";
import TransactionInput from "./TransactionInput";

import PaymentMethod from "@/enums/PaymentMethod";
import theme from "@/constants/theme";

const PAYMENT_OPTIONS = [
  {
    method: PaymentMethod.CASH_ON_DELIVERY,
    icon: "cash-outline",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
  },
  {
    method: PaymentMethod.ONLINE,
    icon: "card-outline",
    label: "Online Payment",
    description: "Pay now via transaction ID",
  },
];

const PaymentSelector = ({
  selectedMethod = PaymentMethod.CASH_ON_DELIVERY,
  transactionId = "",
  onMethodChange = () => {},
  onTransactionIdChange = () => {},
  transactionError = "",
}) => {
  const isOnline = selectedMethod === PaymentMethod.ONLINE;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>

      {PAYMENT_OPTIONS.map((option) => (
        <PaymentCard
          key={option.method}
          option={option}
          isSelected={selectedMethod === option.method}
          onPress={onMethodChange}
        />
      ))}

      {isOnline && (
        <TransactionInput
          value={transactionId}
          onChangeText={onTransactionIdChange}
          error={transactionError}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
});

export default PaymentSelector;