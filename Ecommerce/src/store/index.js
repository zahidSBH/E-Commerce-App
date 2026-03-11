import { configureStore } from "@reduxjs/toolkit";
import userReducer, {
  fetchProfile,
  updateProfile,
} from "@/store/slices/userSlice";
import productReducer from "@/store/slices/productSlice";
import cartReducer from "@/store/slices/cartSlice";
import orderReducer from "@/store/slices/orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          fetchProfile.fulfilled.type,
          updateProfile.fulfilled.type,
          "product/fetchProducts/fulfilled",
          "product/addProduct/fulfilled",
          "product/updateProduct/fulfilled",
        ],
        ignoredPaths: [
          "user.profile.createdAt",
          "user.profile.updatedAt",
          "product.all.createdAt",
          "product.all.updatedAt",
        ],
      },
    }),
});

export default store;
