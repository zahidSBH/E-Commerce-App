import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";
import createProductModel from "@/models/productModel";

const DiscountBadge = ({ discount = 0 }) => {
  if (!discount || discount <= 0) return null;
  return (
    <View style={styles.discountBadge}>
      <Text style={styles.discountText}>{discount}% OFF</Text>
    </View>
  );
};

const NewBadge = ({ isNew = false }) => {
  if (!isNew) return null;
  return (
    <View style={styles.newBadge}>
      <Text style={styles.newBadgeText}>NEW</Text>
    </View>
  );
};

const RatingRow = ({ rating = 0, reviewCount = 0 }) => (
  <View style={styles.ratingRow}>
    <Ionicons name="star" size={12} color={theme.colors.primary} />
    <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    <Text style={styles.reviewText}>({reviewCount})</Text>
  </View>
);

const PriceRow = ({ price = 0, originalPrice = 0, discount = 0 }) => (
  <View style={styles.priceRow}>
    <Text style={styles.price}>${price.toFixed(2)}</Text>
    {discount > 0 && (
      <Text style={styles.originalPrice}>${originalPrice.toFixed(2)}</Text>
    )}
  </View>
);

const ProductCard = ({
  product = createProductModel(),
  onPress = () => {},
  width = 160,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { width }]}
      onPress={() => onPress(product)}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <DiscountBadge discount={product.discount} />
        <NewBadge isNew={product.isNew} />
      </View>
      <View style={styles.details}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <RatingRow rating={product.rating} reviewCount={product.reviewCount} />
        <PriceRow
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: "100%",
    height: 160,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
  },
  discountText: {
    fontSize: theme.typography.fontSizeXS,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.white,
  },
  newBadge: {
    position: "absolute",
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.success,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
  },
  newBadgeText: {
    fontSize: theme.typography.fontSizeXS,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.white,
  },
  details: {
    padding: theme.spacing.sm,
    gap: 4,
  },
  category: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  name: {
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: theme.typography.fontSizeXS,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
  },
  reviewText: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textMuted,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  price: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
  },
  originalPrice: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textMuted,
    textDecorationLine: "line-through",
  },
});

export default ProductCard;
