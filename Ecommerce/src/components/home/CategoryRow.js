import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Category from "@/enums/Category";
import theme from "@/constants/theme";
import CategoryChip from "@/components/home/CategoryChip";

const CATEGORIES = Object.values(Category);

const CategoryRow = ({
  selectedCategory = Category.ALL,
  onSelectCategory = () => {},
}) => {
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <CategoryChip
          label={item}
          isSelected={selectedCategory === item}
          onPress={() => onSelectCategory(item)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
});

export default CategoryRow;
