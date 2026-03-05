import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/constants/theme';

const DEFAULT_PROPS = {
  userName: '',
  cartCount: 0,
  onCartPress: () => {},
};

const Greeting = ({ userName = '' }) => (
  <View style={styles.greetingContainer}>
    <Text style={styles.greetingText}>Hello, 👋</Text>
    <Text style={styles.userName}>{userName || 'Guest'}</Text>
  </View>
);

const CartButton = ({ cartCount = 0, onPress = () => {} }) => (
  <TouchableOpacity style={styles.cartButton} onPress={onPress} activeOpacity={0.8}>
    <Ionicons name="bag-outline" size={24} color={theme.colors.textPrimary} />
    {cartCount > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {cartCount > 99 ? '99+' : cartCount}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

const HomeHeader = ({
  userName = DEFAULT_PROPS.userName,
  cartCount = DEFAULT_PROPS.cartCount,
  onCartPress = DEFAULT_PROPS.onCartPress,
}) => {
  return (
    <View style={styles.container}>
      <Greeting userName={userName} />
      <CartButton cartCount={cartCount} onPress={onCartPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  greetingContainer: {
    gap: 2,
  },
  greetingText: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.textSecondary,
  },
  userName: {
    fontSize: theme.typography.fontSizeXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    minWidth: 16,
    height: 16,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.white,
  },
});

export default HomeHeader;