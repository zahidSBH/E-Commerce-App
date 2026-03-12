import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/constants/theme';
import UserStatType from '@/enums/UserStatType';

const STAT_CONFIG = Object.freeze({
  [UserStatType.CUSTOMERS]: {
    icon: 'people-outline',
    label: 'Customers',
    color: theme.colors.primary,
    background: theme.colors.primaryFaded,
  },
  [UserStatType.ADMINS]: {
    icon: 'shield-checkmark-outline',
    label: 'Admins',
    color: theme.colors.warning,
    background: theme.colors.warningFaded,
  },
  [UserStatType.DISABLED]: {
    icon: 'ban-outline',
    label: 'Disabled',
    color: theme.colors.error,
    background: theme.colors.errorFaded,
  },
});

const StatCard = React.memo(({ configKey = UserStatType.CUSTOMERS, value = 0 }) => {
  const config = STAT_CONFIG[configKey] ?? STAT_CONFIG[UserStatType.CUSTOMERS];

  return (
    <View
      style={[styles.card, { backgroundColor: config.background }]}
      accessibilityLabel={`${config.label}: ${value}`}
    >
      <Ionicons
        name={config.icon}
        size={theme.iconSizes.md}
        color={config.color}
      />
      <Text style={[styles.cardValue, { color: config.color }]}>{value}</Text>
      <Text style={[styles.cardLabel, { color: config.color }]}>
        {config.label}
      </Text>
    </View>
  );
});

const UserStatsBar = ({ customers = 0, admins = 0, disabled = 0 }) => (
  <View style={styles.container}>
    <StatCard configKey={UserStatType.CUSTOMERS} value={customers} />
    <StatCard configKey={UserStatType.ADMINS} value={admins} />
    <StatCard configKey={UserStatType.DISABLED} value={disabled} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
  },
  cardValue: {
    fontSize: theme.typography.fontSizeXL,
    fontWeight: theme.typography.fontWeightBold,
  },
  cardLabel: {
    fontSize: theme.typography.fontSizeXS,
    fontWeight: theme.typography.fontWeightSemiBold,
  },
});

export default UserStatsBar;