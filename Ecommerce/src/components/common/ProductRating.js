import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const ProductRating = ({ rating = 0, reviewCount = 0, size = 16 }) => (
  <View style={styles.row}>
    <Ionicons name="star" size={size} color="#F59E0B" />
    <Text style={styles.rating}>{rating}</Text>
    <Text style={styles.reviewCount}>({reviewCount} reviews)</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  rating: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
  },
  reviewCount: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textMuted,
  },
});

export default ProductRating;
