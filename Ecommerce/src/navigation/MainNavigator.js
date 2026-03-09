import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import ProductDetailScreen from "@/screens/products/ProductDetailScreen";
import CartScreen from "@/screens/cart/CartScreen";
import CheckoutScreen from "@/screens/checkout/CheckoutScreen";
import OrderPreviewScreen from "@/screens/checkout/OrderPreviewScreen";
import OrderCompleteScreen from "@/screens/checkout/OrderCompleteScreen";
import OrdersScreen from "@/screens/profile/OrdersScreen";
import ProductRoutes from "@/enums/ProductRoutes";
import CheckoutRoutes from "@/enums/CheckoutRoutes";
import ProfileRoutes from "@/enums/ProfileRoutes";

const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={MainTabNavigator} />
    <Stack.Screen
      name={ProductRoutes.PRODUCT_DETAIL}
      component={ProductDetailScreen}
    />
    <Stack.Screen name={ProductRoutes.CART} component={CartScreen} />
    <Stack.Screen name={CheckoutRoutes.CHECKOUT} component={CheckoutScreen} />
    <Stack.Screen
      name={CheckoutRoutes.ORDER_PREVIEW}
      component={OrderPreviewScreen}
    />
    <Stack.Screen
      name={CheckoutRoutes.ORDER_COMPLETE}
      component={OrderCompleteScreen}
    />
    <Stack.Screen
      name={ProfileRoutes.ORDER_HISTORY}
      component={OrdersScreen}
    />
  </Stack.Navigator>
);

export default MainNavigator;
