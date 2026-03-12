import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/constants/theme';

const UserListError = ({ message = '' }) => (
  <View
    style={styles.container}
    accessibilityRole="alert"
    accessibilityLabel={`Error: ${message}`}
  >
    <Ionicons
      name="alert-circle-outline"
      size={theme.iconSizes.xl}
      color={theme.colors.error}
    />
    <Text style={styles.title}>Something went wrong</Text>
    <Text style={styles.subtitle}>
      {message || 'Please try again later.'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSizeXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});

export default UserListError;