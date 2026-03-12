import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import ScreenHeader from "@/components/common/ScreenHeader";
import ProductForm from "@/components/admin/ProductForm";
import { updateProduct, selectProductById } from "@/store/slices/productSlice";
import SliceStatus from "@/enums/SliceStatus";
import theme from "@/constants/theme";

const EditProductScreen = ({ navigation, route }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();
  const product = useSelector(selectProductById(productId));
  const status = useSelector((state) => state.product.status);

  if (!product) {
    navigation.goBack();
    return null;
  }

  const handleUpdateProduct = async (data) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price),
    };

    const resultAction = await dispatch(
      updateProduct({ id: productId, payload: formattedData })
    );

    if (updateProduct.fulfilled.match(resultAction)) {
      Alert.alert("Success", "Product updated successfully", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert("Error", "Failed to update product. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader
        title="Edit Product"
        onBackPress={() => navigation.goBack()}
      />
      <ProductForm
        initialValues={product}
        onSubmit={handleUpdateProduct}
        loading={status === SliceStatus.LOADING}
        submitLabel="Update Product"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default EditProductScreen;
