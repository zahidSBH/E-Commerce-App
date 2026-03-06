import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import theme from '@/constants/theme';

const FormField = ({
  label = '',
  placeholder = '',
  keyboardType = 'default',
  control = null,
  name = '',
  rules = {},
  error = '',
}) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            accessibilityLabel={label}
            style={[styles.input, error ? styles.inputError : null]}
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textMuted}
            keyboardType={keyboardType}
          />
        )}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    gap: theme.spacing.xs,
  },
  label: {
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textSecondary,
  },
  input: {
    height: 48,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textPrimary,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.error,
  },
});

export default FormField;