import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '@/constants/theme';

const InfoRow = ({ label = '', value = '' }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textSecondary,
  },
  value: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
  },
});

export default InfoRow;