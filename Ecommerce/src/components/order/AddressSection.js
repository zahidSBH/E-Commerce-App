import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Section from '@/components/order/Section';
import theme from '@/constants/theme';

const AddressSection = ({ address = {} }) => {
  return (
    <Section title="Delivery Address">
      <Text style={styles.addressText}>{address?.fullName ?? ''}</Text>
      <Text style={styles.addressText}>{address?.phone ?? ''}</Text>
      <Text style={styles.addressText}>{address?.street ?? ''}</Text>
      <Text style={styles.addressText}>
        {address?.city ?? ''}, {address?.zip ?? ''}
      </Text>
    </Section>
  );
};

const styles = StyleSheet.create({
  addressText: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.fontSizeLG + theme.spacing.xs,
  },
});

export default AddressSection;