import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import Category from "@/enums/Category";
import theme from "@/constants/theme";

const ALL_CATEGORIES = Object.values(Category);

const CategoryTabs = ({
  selectedCategory = Category.ALL,
  onCategoryPress = () => {},
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.scrollView}
    contentContainerStyle={styles.scrollContent}
  >
    {ALL_CATEGORIES.map((category) => {
      const isSelected = selectedCategory === category;

      return (
        <TouchableOpacity
          key={category}
          style={[styles.tab, isSelected && styles.tabSelected]}
          onPress={() => onCategoryPress(category)}
          activeOpacity={0.8}
        >
          <Text style={[styles.label, isSelected && styles.labelSelected]}>
            {category}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
    alignItems: "center",
  },
  tab: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    borderWidth: theme.borderWidth.sm,
    borderColor: theme.colors.border,
  },
  tabSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  label: {
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textSecondary,
  },
  labelSelected: {
    color: theme.colors.white,
  },
});

export default CategoryTabs;
