import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminDashboard from "@/screens/admin/AdminDashboard";
import ProductManagement from "@/screens/admin/ProductManagement";
import AdminRoutes from "@/enums/AdminRoutes";

const Stack = createNativeStackNavigator();

const AdminNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={AdminRoutes.DASHBOARD} component={AdminDashboard} />
    <Stack.Screen
      name={AdminRoutes.MANAGE_PRODUCTS}
      component={ProductManagement}
    />
  </Stack.Navigator>
);

export default AdminNavigator;
