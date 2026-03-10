import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import theme from "@/constants/theme";

const TransactionInput = ({
  value = "",
  onChangeText = () => {},
  error = "",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Transaction ID</Text>

      <TextInput
        style={[styles.input, error && styles.errorInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter transaction ID"
        placeholderTextColor={theme.colors.textMuted}
      />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xs,
  },

  label: {
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textSecondary,
  },

  input: {
    height: theme.sizes.input,
    borderWidth: theme.borderWidth.md,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.white,
  },

  errorInput: {
    borderColor: theme.colors.error,
  },

  errorText: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.error,
  },
});

export default TransactionInput;