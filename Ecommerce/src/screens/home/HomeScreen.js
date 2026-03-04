import React from "react";
import { Ionicons } from "@expo/vector-icons";
import ScreenLabel from "@/components/ScreenLabel";
import theme from "@/constants/theme";

const HomeScreen = () => {
  const renderIcon = () => (
    <Ionicons name="home" size={32} color={theme.colors.primary} />
  );

  return (
    <ScreenLabel
      title="Home"
      subtitle="Welcome to your feed"
      icon={renderIcon()}
    />
  );
};

export default HomeScreen;
