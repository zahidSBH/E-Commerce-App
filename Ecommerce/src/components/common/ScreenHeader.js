import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const ScreenHeader = ({
  title = "",
  onBackPress = () => {},
  RightComponent = null,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
        <Ionicons
          name="arrow-back"
          size={22}
          color={theme.colors.textPrimary}
        />
      </TouchableOpacity>

      {title ? <Text style={styles.title}>{title}</Text> : null}

      <View style={styles.rightSide}>
        {RightComponent ? <RightComponent /> : <View style={styles.placeholder} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    height: 56,
  },
  title: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  rightSide: {
    width: theme.sizes.iconButton,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    width: theme.sizes.iconButton,
  },
  iconButton: {
    width: theme.sizes.iconButton,
    height: theme.sizes.iconButton,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ScreenHeader;
