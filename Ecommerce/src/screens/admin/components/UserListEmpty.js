import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/constants/theme';

const UserListEmpty = () => (
  <View
    style={styles.container}
    accessibilityLabel="No users found"
  >
    <Ionicons
      name="people-outline"
      size={theme.iconSizes.xl}
      color={theme.colors.border}
    />
    <Text style={styles.title}>No users found</Text>
    <Text style={styles.subtitle}>Try adjusting your search</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.xxl,
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

export default UserListEmpty;