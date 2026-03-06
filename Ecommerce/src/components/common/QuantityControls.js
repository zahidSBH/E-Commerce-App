import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const getSafeQuantity = (value = 1) => {
  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
};

const QuantityButtons = ({
  quantity = 1,
  onIncrement = () => {},
  onDecrement = () => {},
}) => {
  const safeQuantity = getSafeQuantity(quantity);

  return (
    <View style={styles.controls}>
      <TouchableOpacity style={styles.button} onPress={onDecrement}>
        <Ionicons name="remove" size={18} color={theme.colors.textPrimary} />
      </TouchableOpacity>

      <Text style={styles.value}>{safeQuantity}</Text>

      <TouchableOpacity style={styles.button} onPress={onIncrement}>
        <Ionicons name="add" size={18} color={theme.colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const QuantityControls = ({
  quantity = 1,
  onIncrement = () => {},
  onDecrement = () => {},
  showLabel = true,
}) => {
  if (!showLabel) {
    return (
      <QuantityButtons
        quantity={quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    );
  }

  return (
    <View style={styles.row}>
      <Text style={styles.label}>Quantity</Text>
      <QuantityButtons
        quantity={quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderWidth: theme.borderWidth.sm,
    borderColor: theme.colors.border,
  },
  button: {
    width: theme.sizes.controlSm,
    height: theme.sizes.controlSm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: theme.elevation.md,
    elevation: theme.elevation.sm,
  },
  value: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    minWidth: theme.sizes.quantityLabel,
    textAlign: "center",
  },
});
export default QuantityControls;