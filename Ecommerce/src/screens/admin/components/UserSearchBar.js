import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/constants/theme';

const UserSearchBar = ({ value = '', onChange = () => {} }) => {
  const handleClear = () => onChange('');
  const hasValue = value.length > 0;

  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={theme.iconSizes.sm}
        color={theme.colors.textMuted}
      />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Search by name or email..."
        placeholderTextColor={theme.colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />

      {hasValue && (
        <TouchableOpacity
          onPress={handleClear}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
        >
          <Ionicons
            name="close-circle"
            size={theme.iconSizes.sm}
            color={theme.colors.textMuted}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textPrimary,
    paddingVertical: 0,
  },
});

export default UserSearchBar;