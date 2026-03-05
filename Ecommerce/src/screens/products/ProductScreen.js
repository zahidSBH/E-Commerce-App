import React from "react";
import { Ionicons } from "@expo/vector-icons";
import ScreenLabel from "@/components/ScreenLabel";
import theme from "@/constants/theme";

const ProductScreen = () => {
  const renderIcon = () => (
    <Ionicons name="bag-handle" size={32} color={theme.colors.primary} />
  );

  return (
    <ScreenLabel
      title="Products"
      subtitle="Browse our collection"
      icon={renderIcon()}
    />
  );
};

export default ProductScreen;
