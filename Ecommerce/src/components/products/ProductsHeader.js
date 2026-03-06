import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CartBadgeButton from "@/components/common/CartBadgeButton";
import theme from "@/constants/theme";

const ProductsHeader = ({ cartCount = 0, onCartPress = () => {} }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Products</Text>
    <CartBadgeButton cartCount={cartCount} onPress={onCartPress} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSizeXXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
});

export default ProductsHeader;
