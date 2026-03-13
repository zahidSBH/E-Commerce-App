import React, { useState, useMemo } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import useCart from "@/hooks/useCart";
import useProducts from "@/hooks/useProducts";
import useWishlist from "@/hooks/useWishlist";

import ScreenHeader from "@/components/common/ScreenHeader";
import CartBadgeButton from "@/components/common/CartBadgeButton";
import QuantityControls from "@/components/common/QuantityControls";
import ProductRating from "@/components/common/ProductRating";

import PriceRow from "@/components/products/PriceRow";
import AddToCartButton from "@/components/products/AddToCartButton";

import ProductRoutes from "@/enums/ProductRoutes";
import theme from "@/constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ProductDetailScreen = ({ navigation = null, route = {} }) => {
  const { productId = "" } = route?.params ?? {};

  const { getProductById } = useProducts();
  const product = getProductById(productId);

  const { isInCart, cartItem, addItem, increment, decrement, cartCount } =
    useCart(productId);

  const { toggleWishlist, isItemInWishlist } = useWishlist();
  const isInWishlist = isItemInWishlist(productId);

  const [quantity, setQuantity] = useState(1);

  const currentQuantity = isInCart ? (cartItem?.quantity ?? 1) : quantity;

  const navigateToCart = () => navigation?.navigate(ProductRoutes.CART);

  const handleAddToCart = () => {
    addItem({ ...product, quantity });
    navigateToCart();
  };

  const handleIncrement = () => {
    if (isInCart) increment(productId);
    else setQuantity((q) => q + 1);
  };

  const handleDecrement = () => {
    if (isInCart) decrement(productId);
    else setQuantity((q) => Math.max(1, q - 1));
  };

  const RightComponent = useMemo(
    () => () => (
      <View style={styles.headerRight}>
        <TouchableOpacity 
          onPress={() => toggleWishlist(product)} 
          style={styles.wishlistHeaderButton}
        >
          <Ionicons 
            name={isInWishlist ? "heart" : "heart-outline"} 
            size={24} 
            color={isInWishlist ? theme.colors.error : theme.colors.textPrimary} 
          />
        </TouchableOpacity>
        <CartBadgeButton cartCount={cartCount} onPress={navigateToCart} />
      </View>
    ),
    [cartCount, navigateToCart, isInWishlist, toggleWishlist, product]
  );

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Product not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const safePrice = product?.price ?? 0;
  const safeOriginalPrice = product?.originalPrice ?? 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScreenHeader
        onBackPress={() => navigation?.goBack()}
        RightComponent={RightComponent}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.productImage}
          resizeMode="cover"
        />

        <View style={styles.details}>
          <Text style={styles.category}>{product.category}</Text>

          <Text style={styles.name}>{product.name}</Text>

          <ProductRating
            rating={product.rating}
            reviewCount={product.reviewCount}
          />

          <PriceRow
            price={safePrice}
            originalPrice={safeOriginalPrice}
            discount={product.discount}
          />

          <View style={styles.divider} />

          <Text style={styles.descriptionTitle}>Description</Text>

          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.divider} />

          <QuantityControls
            quantity={currentQuantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AddToCartButton
          isInCart={isInCart}
          onPress={handleAddToCart}
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
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    fontSize: theme.typography.fontSizeLG,
    color: theme.colors.textMuted,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  productImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.85,
    backgroundColor: theme.colors.surface,
  },
  details: {
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  category: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeightSemiBold,
    textTransform: "uppercase",
  },
  name: {
    fontSize: theme.typography.fontSizeXXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  divider: {
    height: theme.borderWidth.sm,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xs,
  },
  descriptionTitle: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  description: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.fontSizeLG + theme.spacing.sm,
  },
  footer: {
    padding: theme.spacing.md,
    borderTopWidth: theme.borderWidth.sm,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  wishlistHeaderButton: {
    padding: theme.spacing.xs,
  },
});

export default ProductDetailScreen;