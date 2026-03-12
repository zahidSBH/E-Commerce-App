import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '@/constants/theme';

const UserSectionHeader = ({ title = '', count = 0 }) => (
  <View
    style={styles.container}
    accessibilityLabel={`${title} ${count}`}
  >
    <Text style={styles.title}>{title}</Text>

    <View style={styles.badge}>
      <Text style={styles.count}>{count}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  badge: {
    backgroundColor: theme.colors.primaryFaded,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  count: {
    fontSize: theme.typography.fontSizeXS,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
  },
});

export default UserSectionHeader;