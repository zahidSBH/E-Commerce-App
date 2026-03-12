import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/constants/theme';

const DetailRow = ({ icon = '', label = '', value = '' }) => (
  <View style={styles.container}>
    {icon ? (
      <Ionicons name={icon} size={16} color={theme.colors.textMuted} />
    ) : null}
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  label: {
    flex: 1,
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textSecondary,
  },
  value: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
  },
});

export default DetailRow;