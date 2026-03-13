import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import theme from "@/constants/theme";
import useProducts from "@/hooks/useProducts";
import { deleteProduct } from "@/store/slices/productSlice";
import AdminRoutes from "@/enums/AdminRoutes";
import ScreenHeader from "@/components/common/ScreenHeader";
import ProductSearchBar from "@/components/products/ProductSearchBar";

const ProductManagement = ({ navigation }) => {
  const dispatch = useDispatch();
  const { allProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return allProducts;
    const query = searchQuery.toLowerCase();
    return allProducts.filter((product) =>
      product.name?.toLowerCase().includes(query)
    );
  }, [allProducts, searchQuery]);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => dispatch(deleteProduct(id)),
        },
      ]
    );
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate(AdminRoutes.EDIT_PRODUCT, { productId: item.id })
          }
        >
          <Ionicons
            name="pencil-outline"
            size={theme.iconSizes.md}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDelete(item.id)}
        >
          <Ionicons
            name="trash-outline"
            size={theme.iconSizes.md}
            color={theme.colors.error}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Manage Products"
        onBackPress={() => navigation.goBack()}
      />

      <ProductSearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery("")}
        placeholder="Search by product name..."
      />

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate(AdminRoutes.ADD_PRODUCT)}
      >
        <Ionicons
          name="add"
          size={theme.iconSizes.xl}
          color={theme.colors.white}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.lg,
  },
  productItem: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    alignItems: "center",
    justifyContent: "space-between",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
  },
  productCategory: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textMuted,
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  actionButton: {
    padding: theme.spacing.xs,
  },
  fab: {
    position: "absolute",
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    width: theme.sizes.iconButton * 1.5,
    height: theme.sizes.iconButton * 1.5,
    borderRadius: (theme.sizes.iconButton * 1.5) / 2,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: theme.elevation.md,
  },
});

export default ProductManagement;
