import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/constants/theme';

const DEFAULT_PROPS = {
  onPress: () => {},
  placeholder: 'Search products...',
};

const SearchBar = ({
  onPress = DEFAULT_PROPS.onPress,
  placeholder = DEFAULT_PROPS.placeholder,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="search-outline" size={18} color={theme.colors.textMuted} />
      <Text style={styles.placeholder}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 2,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  placeholder: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textMuted,
  },
});

export default SearchBar;