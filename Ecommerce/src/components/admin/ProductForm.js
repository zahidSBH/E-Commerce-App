import React from "react";
import { View, StyleSheet, ScrollView, Text, Switch } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import Category from "@/enums/Category";
import productValidation from "@/validation/productValidation";
import theme from "@/constants/theme";

const ProductForm = ({
  initialValues = {},
  onSubmit = () => {},
  loading = false,
  submitLabel = "Save Product",
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialValues.name || "",
      description: initialValues.description || "",
      price: String(initialValues.price || ""),
      category: initialValues.category || Category.ELECTRONICS,
      imageUrl: initialValues.imageUrl || "",
      isFeatured: initialValues.isFeatured || false,
      isNew: initialValues.isNew || false,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Controller
        control={control}
        name="name"
        rules={productValidation.name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Product Name"
            placeholder="e.g. Wireless Headphones"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        rules={productValidation.category}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Category"
            placeholder="e.g. Electronics"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.category?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="price"
        rules={productValidation.price}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Price"
            placeholder="99.99"
            keyboardType="decimal-pad"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.price?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="imageUrl"
        rules={productValidation.imageUrl}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Image URL"
            placeholder="https://example.com/image.jpg"
            keyboardType="url"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.imageUrl?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        rules={productValidation.description}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Description"
            placeholder="Describe the product..."
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.description?.message}
            multiline
            numberOfLines={4}
          />
        )}
      />

      <View style={styles.switchContainer}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Mark as New Arrival</Text>
          <Controller
            control={control}
            name="isNew"
            render={({ field: { onChange, value } }) => (
              <Switch
                value={value}
                onValueChange={onChange}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary,
                }}
              />
            )}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Featured Product</Text>
          <Controller
            control={control}
            name="isFeatured"
            render={({ field: { onChange, value } }) => (
              <Switch
                value={value}
                onValueChange={onChange}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary,
                }}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          label={submitLabel}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
  },
  switchContainer: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.md,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  switchLabel: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeightSemiBold,
  },
  footer: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xxl,
  },
});

export default ProductForm;
