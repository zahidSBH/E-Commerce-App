 
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { fetchProfile, updateProfile } from '@/store/slices/userSlice';
import productReducer from '@/store/slices/productSlice';
import cartReducer from '@/store/slices/cartSlice';
import orderReducer from '@/store/slices/orderSlice';
import wishlistReducer from '@/store/slices/wishlistSlice';
import { fetchOrdersHistory } from '@/store/thunks/orderThunks';
import { getWishlist, addToWishlist, removeFromWishlist } from '@/store/thunks/wishlistThunks';
import adminUserReducer from '@/store/slices/adminUserSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
    adminUser: adminUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          fetchProfile.fulfilled.type,
          updateProfile.fulfilled.type,
          fetchOrdersHistory.fulfilled.type,
          getWishlist.fulfilled.type,
          addToWishlist.fulfilled.type,
          removeFromWishlist.fulfilled.type,
        ],
        ignoredPaths: [
          "user.profile.createdAt",
          "user.profile.updatedAt",
          "order.lastVisible",
          "wishlist.items",
        ],
      },
    }),
});

export default store;