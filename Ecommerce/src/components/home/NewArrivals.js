import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ProductCard from "@/components/home/ProductCard";
import theme from "@/constants/theme";
import { FlashList } from "@shopify/flash-list";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - theme.spacing.lg * 2 - theme.spacing.sm) / 2;

const SectionHeader = () => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>New Arrivals</Text>
    <Text style={styles.sectionSubtitle}>Just dropped</Text>
  </View>
);

const NewArrivals = ({ products = [], onProductPress = () => {} }) => {
  const displayProducts = products.slice(0, 10);
  if (!displayProducts.length) return null;

  return (
    <View style={styles.container}>
      <SectionHeader />
      <FlashList
        data={displayProducts}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard
              product={item}
              onPress={onProductPress}
              width={CARD_WIDTH}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        initialNumToRender={10}
        estimatedItemSize={CARD_WIDTH + theme.spacing.sm}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.xl,
    paddingLeft: theme.spacing.lg,
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
  columnWrapper: {
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  cardWrapper: {
    flex: 1,
    marginBottom: theme.spacing.sm,
  },
});

export default NewArrivals;
