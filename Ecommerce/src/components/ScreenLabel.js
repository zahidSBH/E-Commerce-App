import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '@/constants/theme';

const DEFAULT_PROPS = {
  title: '',
  subtitle: '',
  icon: null,
};

const ScreenLabel = ({ title = DEFAULT_PROPS.title, subtitle = DEFAULT_PROPS.subtitle, icon = DEFAULT_PROPS.icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    gap: theme.spacing.md,
  },
  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primaryFaded,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.fontSizeXXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.colors.textSecondary,
  },
});

export default ScreenLabel;