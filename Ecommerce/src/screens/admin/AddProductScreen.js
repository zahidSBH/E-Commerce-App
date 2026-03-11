import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import ScreenHeader from "@/components/common/ScreenHeader";
import ProductForm from "@/components/admin/ProductForm";
import { addProduct } from "@/store/slices/productSlice";
import SliceStatus from "@/enums/SliceStatus";
import theme from "@/constants/theme";

const AddProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.product.status);

  const handleAddProduct = async (data) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price),
      rating: 0,
      reviewCount: 0,
      tags: [],
    };

    const resultAction = await dispatch(addProduct(formattedData));
    
    if (addProduct.fulfilled.match(resultAction)) {
      Alert.alert("Success", "Product added successfully", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert("Error", "Failed to add product. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader
        title="Add New Product"
        onBackPress={() => navigation.goBack()}
      />
      <ProductForm
        onSubmit={handleAddProduct}
        loading={status === SliceStatus.LOADING}
        submitLabel="Create Product"
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

export default AddProductScreen;
