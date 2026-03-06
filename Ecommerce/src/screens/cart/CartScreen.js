import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';

import ScreenHeader from '@/components/common/ScreenHeader';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

import useCart from '@/hooks/useCart';
import useOrder from '@/hooks/useOrder';

import CheckoutRoutes from '@/enums/CheckoutRoutes';
import theme from '@/constants/theme';

const CartScreen = ({ navigation = null }) => {
  const { cartItems = [], increment, decrement, removeItem } = useCart();
  const { subtotal = 0, deliveryFee = 0, total = 0 } = useOrder();

  const isCartEmpty = cartItems.length === 0;

  const handleCheckout = () => {
    navigation?.navigate(CheckoutRoutes.CHECKOUT);
  };

  const handleBack = () => {
    navigation?.goBack();
  };

  const renderCartItem = ({ item }) => (
    <CartItem
      item={item}
      onIncrement={increment}
      onDecrement={decrement}
      onRemove={removeItem}
    />
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="bag-outline"
        size={theme.iconSizes.lg}
        color={theme.colors.border}
      />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>Add items to get started</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScreenHeader
        onBackPress={handleBack}
        title="My Cart"
      />

      {isCartEmpty ? (
        renderEmptyCart()
      ) : (
        <View style={styles.container}>
          <FlashList
            data={cartItems}
            keyExtractor={(item) => String(item.productId)}
            estimatedItemSize={110}
            contentContainerStyle={styles.listContent}
            renderItem={renderCartItem}
            showsVerticalScrollIndicator={false}
          />

          <CartSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            onCheckout={handleCheckout}
          />
        </View>
      )}
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

  listContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },

  emptyTitle: {
    fontSize: theme.typography.fontSizeXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },

  emptySubtitle: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textMuted,
  },
});

export default CartScreen;