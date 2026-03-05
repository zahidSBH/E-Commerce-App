import React from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import ProductCard from "@/components/home/ProductCard";
import SectionHeader from "@/components/common/SectionHeader";
import theme from "@/constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH =
  (SCREEN_WIDTH - theme.spacing.lg * 2 - theme.spacing.sm) / 2;

const FeaturedProducts = ({ products = [], onProductPress = () => {} }) => {
  if (!products || products.length === 0) return null;

  return (
    <View style={styles.container}>
      <SectionHeader title="Featured" subtitle="Handpicked for you" />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={onProductPress}
            width={CARD_WIDTH}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  separator: {
    width: theme.spacing.sm,
  },
});

export default FeaturedProducts;