import React, { useState, useMemo, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeHeader from "@/components/home/HomeHeader";
import ProductSearchBar from "@/components/products/ProductSearchBar";
import BannerCarousel from "@/components/home/BannerCarousel";
import CategoryRow from "@/components/home/CategoryRow";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivals from "@/components/home/NewArrivals";

import useProducts from "@/hooks/useProducts";
import useUserProfile from "@/hooks/useUserProfile";
import useCart from "@/hooks/useCart";

import theme from "@/constants/theme";
import ProductRoutes from "@/enums/ProductRoutes";
import Category from "@/enums/Category";
import TabRoutes from "@/enums/TabRoutes";

const HomeScreen = ({ navigation = null }) => {
  const { profile = {} } = useUserProfile();
  const { featuredProducts = [], newArrivals = [] } = useProducts();
  const { cartCount = 0 } = useCart();

   
  const [homeCategory, setHomeCategory] = useState(Category.ALL);
  const [homeSearch, setHomeSearch] = useState("");

  const filterProducts = (products = []) => {
    let result = products;

    if (homeCategory !== Category.ALL) {
      result = result.filter((p) => p?.category === homeCategory);
    }

    if (homeSearch.trim().length > 0) {
      const q = homeSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p?.name?.toLowerCase().includes(q) ||
          p?.category?.toLowerCase().includes(q) ||
          p?.tags?.some((tag) => tag?.toLowerCase().includes(q))
      );
    }

    return result;
  };

  const displayFeatured = useMemo(
    () => filterProducts(featuredProducts),
    [featuredProducts, homeCategory, homeSearch]
  );

  const displayNewArrivals = useMemo(
    () => filterProducts(newArrivals),
    [newArrivals, homeCategory, homeSearch]
  );

  const navigateToProduct = useCallback(
    (product = {}) => {
      navigation?.navigate(ProductRoutes.PRODUCT_DETAIL, {
        productId: product?.id,
      });
    },
    [navigation]
  );

  const navigateToProducts = useCallback(() => {
    navigation?.navigate(TabRoutes.PRODUCTS);
  }, [navigation]);

  const navigateToCart = useCallback(() => {
    navigation?.navigate(ProductRoutes.CART);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <HomeHeader
          userName={profile?.fullName ?? ""}
          cartCount={cartCount}
          onCartPress={navigateToCart}
        />

        <ProductSearchBar
          value={homeSearch}
          onChangeText={setHomeSearch}
          onClear={() => setHomeSearch("")}
        />

        <BannerCarousel />

        <CategoryRow
          selectedCategory={homeCategory}
          onSelectCategory={setHomeCategory}
        />

        <FeaturedProducts
          products={displayFeatured}
          onProductPress={navigateToProduct}
          onSeeAllPress={navigateToProducts}
        />

        <NewArrivals
          products={displayNewArrivals}
          onProductPress={navigateToProduct}
          onSeeAllPress={navigateToProducts}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  container: {
    flex: 1,
  },

  content: {
    paddingBottom: theme.spacing.xxl,
  },
});

export default HomeScreen;