import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import ProductCard from '@/components/home/ProductCard';
import theme from '@/constants/theme';

const DEFAULT_PROPS = {
  products: [],
  onProductPress: () => {},
};

const SectionHeader = ({ title = '', subtitle = '' }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
  </View>
);

const FeaturedProducts = ({
  products = DEFAULT_PROPS.products,
  onProductPress = DEFAULT_PROPS.onProductPress,
}) => {
  if (!products || products.length === 0) return null;

  return (
    <View style={styles.container}>
      <SectionHeader title="Featured" subtitle="Handpicked for you" />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={onProductPress}
            width={160}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.textMuted,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  separator: {
    width: theme.spacing.sm,
  },
});

export default FeaturedProducts;