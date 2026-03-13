import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminDashboard from "@/screens/admin/AdminDashboard";
import ProductManagement from "@/screens/admin/ProductManagement";
import AddProductScreen from "@/screens/admin/AddProductScreen";
import EditProductScreen from "@/screens/admin/EditProductScreen";
import OrderManagement from "@/screens/admin/OrderManagement";
import AdminOrderDetails from "@/screens/admin/AdminOrderDetails";
import UserManagement from "@/screens/admin/UserManagement";
import AdminRoutes from "@/enums/AdminRoutes";

const Stack = createNativeStackNavigator();

const AdminNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={AdminRoutes.DASHBOARD} component={AdminDashboard} />
    <Stack.Screen
      name={AdminRoutes.MANAGE_PRODUCTS}
      component={ProductManagement}
    />
    <Stack.Screen name={AdminRoutes.ADD_PRODUCT} component={AddProductScreen} />
    <Stack.Screen
      name={AdminRoutes.EDIT_PRODUCT}
      component={EditProductScreen}
    />
    <Stack.Screen
      name={AdminRoutes.MANAGE_ORDERS}
      component={OrderManagement}
    />
    <Stack.Screen
      name={AdminRoutes.ORDER_DETAILS}
      component={AdminOrderDetails}
    />
    <Stack.Screen name={AdminRoutes.MANAGE_USERS} component={UserManagement} />
  </Stack.Navigator>
);

export default AdminNavigator;
