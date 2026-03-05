import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ProductCard from "@/components/home/ProductCard";
import theme from "@/constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - theme.spacing.lg * 2 - theme.spacing.sm) / 2;

const DEFAULT_PROPS = {
  products: [],
  onProductPress: () => {},
};

const SectionHeader = () => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>New Arrivals</Text>
    <Text style={styles.sectionSubtitle}>Just dropped</Text>
  </View>
);

const NewArrivals = ({
  products = DEFAULT_PROPS.products,
  onProductPress = DEFAULT_PROPS.onProductPress,
}) => {
  if (!products || products.length === 0) return null;

  return (
    <View style={styles.container}>
      <SectionHeader />
      <View style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={onProductPress}
            width={CARD_WIDTH}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.textMuted,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
});

export default NewArrivals;
