import React, { useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useWishlist from "@/hooks/useWishlist";
import WishlistItem from "@/components/profile/WishlistItem";
import WishlistEmptyState from "@/components/profile/WishlistEmptyState";
import theme from "@/constants/theme";
import SliceStatus from "@/enums/SliceStatus";
import ProductRoutes from "@/enums/ProductRoutes";

const WishlistScreen = () => {
  const navigation = useNavigation();
  const { items, status, fetchItems, toggleWishlist } = useWishlist();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleProductPress = useCallback((productId) => {
    navigation.navigate(ProductRoutes.PRODUCT_DETAIL, { productId });
  }, [navigation]);

  const handleRemove = useCallback((productId) => {
    toggleWishlist({ id: productId });
  }, [toggleWishlist]);

  const renderItem = useCallback(({ item }) => (
    <WishlistItem
      item={item}
      onRemove={handleRemove}
      onPress={() => handleProductPress(item.id)}
    />
  ), [handleRemove, handleProductPress]);

  const keyExtractor = useCallback((item) => item.id, []);

  if (status === SliceStatus.LOADING && items.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={<WishlistEmptyState />}
        contentContainerStyle={items.length === 0 ? { flex: 1 } : styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
  },
});

export default React.memo(WishlistScreen);
