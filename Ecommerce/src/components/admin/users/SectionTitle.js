import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "@/constants/theme";

const SectionTitle = ({ title = "" }) => (
  <Text style={styles.title}>{title}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.sm,
  },
});

export default SectionTitle;
