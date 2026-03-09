import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Section from "@/components/order/Section";
import theme from "@/constants/theme";

const ItemsSection = ({ cartItems = [] }) => {
  return (
    <Section title="Order Items">
      {cartItems.map((item = {}) => {
        const price = (item?.price ?? 0) * (item?.quantity ?? 0);

        return (
          <View key={String(item?.productId ?? "")} style={styles.orderItem}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item?.name ?? ""}
            </Text>

            <Text style={styles.itemQty}>x{item?.quantity ?? 0}</Text>

            <Text style={styles.itemPrice}>${price.toFixed(2)}</Text>
          </View>
        );
      })}
    </Section>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  itemName: {
    flex: 1,
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textPrimary,
  },
  itemQty: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.textMuted,
    minWidth: 28,
    textAlign: "center",
  },
  itemPrice: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.primary,
    minWidth: 64,
    textAlign: "right",
  },
});

export default ItemsSection;
