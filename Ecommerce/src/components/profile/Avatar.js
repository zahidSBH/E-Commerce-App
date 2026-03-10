import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const Avatar = () => (
  <View style={styles.wrapper}>
    <View style={styles.ring}>
      <View style={styles.inner}>
        <Ionicons
          name="person"
          size={theme.iconSizes.xl}
          color={theme.colors.primary}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: -50,
    alignSelf: "center",
  },
  ring: {
    width: theme.sizes.avatarOuter,
    height: theme.sizes.avatarOuter,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  inner: {
    width: theme.sizes.avatarInner,
    height: theme.sizes.avatarInner,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primaryFaded,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Avatar;
