import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductSearchBar from '@/components/products/ProductSearchBar';
import CategoryTabs from '@/components/products/CategoryTabs';
import ProductCard from '@/components/home/ProductCard';
import useProducts from '@/hooks/useProducts';
import useCart from '@/hooks/useCart';
import ProductRoutes from '@/enums/ProductRoutes';
import theme from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - theme.spacing.lg * 2 - theme.spacing.sm) / 2;

const ProductScreen = ({ navigation = null, route = {} }) => {
  const {
    filteredProducts,
    selectedCategory,
    searchQuery,
    filterByCategory,
    searchProducts,
    resetFilters,
  } = useProducts();

  const { cartCount } = useCart();

  const navigateToProduct = (product) => {
    navigation?.navigate(ProductRoutes.PRODUCT_DETAIL, {
      productId: product.id,
    });
  };

  const navigateToCart = () => {
    navigation?.navigate(ProductRoutes.CART);
  };

  const handleClearSearch = () => {
    searchProducts('');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ProductsHeader
        cartCount={cartCount}
        onCartPress={navigateToCart}
      />

      <ProductSearchBar
        value={searchQuery}
        onChangeText={searchProducts}
        onClear={handleClearSearch}
        autoFocus={route.params?.focusSearch ?? false}
      />

      <CategoryTabs
        selectedCategory={selectedCategory}
        onCategoryPress={filterByCategory}
      />

      <View style={styles.listContainer}>
        <FlashList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          estimatedItemSize={CARD_WIDTH + theme.spacing.sm}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProductCard
                product={item}
                onPress={navigateToProduct}
                width={CARD_WIDTH}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  listContainer: {paddingLeft: theme.spacing.lg,  
    flex: 1,
  },

  listContent: {
    paddingBottom: theme.spacing.xxl,
  },

  columnWrapper: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
    justifyContent: 'space-between',
     
  },

  cardWrapper: {
    flex: 1,
    marginBottom: theme.spacing.sm,
  },
});

export default ProductScreen;