import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const ProductSearchBar = ({
  value = "",
  onChangeText = () => {},
  onClear = () => {},
  autoFocus = false,
}) => (
  <View style={styles.container}>
    <Ionicons
      name="search-outline"
      size={theme.iconSizes.sm}
      color={theme.colors.textMuted}
    />

    <TextInput
      style={styles.input}
      placeholder="Search products..."
      placeholderTextColor={theme.colors.textMuted}
      value={value}
      onChangeText={onChangeText}
      autoFocus={autoFocus}
      returnKeyType="search"
    />

    {value.length > 0 && (
      <TouchableOpacity onPress={onClear}>
        <Ionicons
          name="close-circle"
          size={theme.iconSizes.sm}
          color={theme.colors.textMuted}
        />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    height: theme.sizes.input,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    borderWidth: theme.borderWidth.sm,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textPrimary,
  },
});

export default ProductSearchBar;
