import React, { useState, useRef } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import theme from "@/constants/theme";
import BANNERS from "@/data/banners";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BANNER_WIDTH = SCREEN_WIDTH - theme.spacing.lg * 2;

const DotIndicator = ({ total = 0, activeIndex = 0 }) => (
  <View style={styles.dotsContainer}>
    {Array.from({ length: total }).map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          index === activeIndex ? styles.dotActive : styles.dotInactive,
        ]}
      />
    ))}
  </View>
);

const BannerItem = ({ item = {} }) => (
  <TouchableOpacity activeOpacity={0.95} style={styles.bannerItem}>
    <Image
      source={{ uri: item.imageUrl }}
      style={styles.bannerImage}
      resizeMode="cover"
    />
  </TouchableOpacity>
);

const BannerCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={BANNERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BannerItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        snapToInterval={BANNER_WIDTH + theme.spacing.sm}
        decelerationRate="fast"
      />
      <DotIndicator total={BANNERS.length} activeIndex={activeIndex} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.sm,
  },
  bannerItem: {
    width: BANNER_WIDTH,
    height: 160,
    marginHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  dot: {
    height: 6,
    borderRadius: theme.borderRadius.full,
  },
  dotActive: {
    width: 20,
    backgroundColor: theme.colors.primary,
  },
  dotInactive: {
    width: 6,
    backgroundColor: theme.colors.border,
  },
});

export default BannerCarousel;
