import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QuantityControls from "@/components/common/QuantityControls";
import theme from "@/constants/theme";

const CartItem = ({
  item = {},
  onIncrement = () => {},
  onDecrement = () => {},
  onRemove = () => {},
}) => {
  const safePrice = (item?.price ?? 0) * (item?.quantity ?? 0);

  const handleRemove = () => onRemove(item.productId);
  const handleIncrement = () => onIncrement(item.productId);
  const handleDecrement = () => onDecrement(item.productId);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.details}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>

          <TouchableOpacity onPress={handleRemove}>
            <Ionicons
              name="trash-outline"
              size={theme.iconSizes.sm}
              color={theme.colors.error}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.category}>{item.category}</Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>${safePrice.toFixed(2)}</Text>

          <QuantityControls
            quantity={item.quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            showLabel={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: theme.elevation.lg,
    elevation: theme.elevation.sm,
    gap: theme.spacing.sm,
  },
  image: {
    width: theme.sizes.cartItemImage,
    height: theme.sizes.cartItemImage,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
  },
  details: {
    flex: 1,
    gap: theme.spacing.xs,
    justifyContent: "space-between",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: theme.spacing.sm,
  },
  name: {
    flex: 1,
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.fontSizeSM + theme.spacing.xs,
  },
  category: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeightSemiBold,
    textTransform: "uppercase",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
  },
});

export default CartItem;
