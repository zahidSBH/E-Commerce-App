import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "@/constants/theme";

const PriceRow = ({
  price = 0,
  originalPrice = 0,
  discount = 0,
}) => {
  const showDiscount = discount > 0;

  return (
    <View style={styles.priceRow}>
      <Text style={styles.price}>${price.toFixed(2)}</Text>

      {showDiscount && (
        <>
          <Text style={styles.originalPrice}>
            ${originalPrice.toFixed(2)}
          </Text>

          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}% OFF</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  price: {
    fontSize: theme.typography.fontSizeXXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
  },
  originalPrice: {
    fontSize: theme.typography.fontSizeLG,
    color: theme.colors.textMuted,
    textDecorationLine: "line-through",
  },
  discountBadge: {
    backgroundColor: theme.colors.primaryFaded,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  discountText: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeightBold,
  },
});

export default PriceRow;