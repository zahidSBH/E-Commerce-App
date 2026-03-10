import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FormField from "@/components/form/FormField";
import { checkoutValidation } from "@/validation/checkoutValidation";
import { AddressField } from "@/enums/AddressFieldEnum";
import theme from "@/constants/theme";

const AddressForm = ({ control = null, errors = {} }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Delivery Address</Text>

      <FormField
        label="Full Name"
        placeholder="John Doe"
        name={AddressField.FULL_NAME}
        control={control}
        rules={checkoutValidation[AddressField.FULL_NAME]}
        error={errors.fullName?.message}
      />

      <FormField
        label="Phone Number"
        placeholder="+1 234 567 8900"
        keyboardType="phone-pad"
        name={AddressField.PHONE}
        control={control}
        rules={checkoutValidation[AddressField.PHONE]}
        error={errors.phone?.message}
      />

      <FormField
        label="Street Address"
        placeholder="123 Main Street"
        name={AddressField.STREET}
        control={control}
        rules={checkoutValidation[AddressField.STREET]}
        error={errors.street?.message}
      />

      <FormField
        label="City"
        placeholder="New York"
        name={AddressField.CITY}
        control={control}
        rules={checkoutValidation[AddressField.CITY]}
        error={errors.city?.message}
      />

      <FormField
        label="ZIP Code"
        placeholder="10001"
        keyboardType="numeric"
        name={AddressField.ZIP}
        control={control}
        rules={checkoutValidation[AddressField.ZIP]}
        error={errors.zip?.message}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
});

export default AddressForm;
