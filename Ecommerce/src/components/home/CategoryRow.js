import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Category from "@/enums/Category";
import theme from "@/constants/theme";

const CATEGORIES = Object.values(Category);

const DEFAULT_PROPS = {
  selectedCategory: Category.ALL,
  onSelectCategory: () => {},
};

const CategoryChip = ({
  label = "",
  isSelected = false,
  onPress = () => {},
}) => (
  <TouchableOpacity
    style={[styles.chip, isSelected && styles.chipSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const CategoryRow = ({
  selectedCategory = DEFAULT_PROPS.selectedCategory,
  onSelectCategory = DEFAULT_PROPS.onSelectCategory,
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
  chip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.colors.textSecondary,
  },
  chipTextSelected: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeightSemiBold,
  },
});

export default CategoryRow;
