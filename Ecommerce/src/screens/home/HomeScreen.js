import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '@/components/home/HomeHeader';
import SearchBar from '@/components/home/SearchBar';
import BannerCarousel from '@/components/home/BannerCarousel';
import CategoryRow from '@/components/home/CategoryRow';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import useProducts from '@/hooks/useProducts';
import useUserProfile from '@/hooks/useUserProfile';
import theme from '@/constants/theme';
import TabRoutes from '@/enums/TabRoutes';
import ProductRoutes from '@/enums/ProductRoutes';

const HomeScreen = ({ navigation = null }) => {
  const { profile } = useUserProfile();
  const {
    featuredProducts,
    newArrivals,
    selectedCategory,
    filterByCategory,
  } = useProducts();

  const navigateToProduct = (product) => {
    navigation?.navigate(ProductRoutes.PRODUCT_DETAIL, { productId: product.id });
  };

  const navigateToProducts = () => {
    navigation?.navigate(TabRoutes.PRODUCTS);
  };

  const navigateToSearch = () => {
    navigation?.navigate(TabRoutes.PRODUCTS, { focusSearch: true });
  };

  const navigateToCart = () => {
    navigation?.navigate(ProductRoutes.CART);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          userName={profile.fullName}
          cartCount={0}
          onCartPress={navigateToCart}
        />
        <SearchBar onPress={navigateToSearch} />
        <BannerCarousel />
        <CategoryRow
          selectedCategory={selectedCategory}
          onCategoryPress={filterByCategory}
        />
        <FeaturedProducts
          products={featuredProducts}
          onProductPress={navigateToProduct}
          onSeeAllPress={navigateToProducts}
        />
        <NewArrivals
          products={newArrivals}
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
