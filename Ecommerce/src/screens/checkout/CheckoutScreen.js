import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import AddressForm from "@/components/checkout/AddressForm";
import theme from "@/constants/theme";

const CheckoutScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      street: "",
      city: "",
      zip: "",
    },
  });

  const onSubmit = (data = {}) => {
    console.log("Checkout Data:", data);
  };

  return (
    <ScrollView style={styles.container}>
      <AddressForm control={control} errors={errors} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
});

export default CheckoutScreen;
