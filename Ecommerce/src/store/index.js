// import { configureStore } from "@reduxjs/toolkit";
// import userReducer, {
//   fetchProfile,
//   updateProfile,
// } from "@/store/slices/userSlice";
// import productReducer from "@/store/slices/productSlice";
// import cartReducer from "@/store/slices/cartSlice";
// import orderReducer from "@/store/slices/orderSlice";

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     product: productReducer,
//     cart: cartReducer,
//     order: orderReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           fetchProfile.fulfilled.type,
//           updateProfile.fulfilled.type,
//           "product/fetchProducts/fulfilled",
//           "product/addProduct/fulfilled",
//           "product/updateProduct/fulfilled",
//         ],
//         ignoredPaths: [
//           "user.profile.createdAt",
//           "user.profile.updatedAt",
//           "product.all.createdAt",
//           "product.all.updatedAt",
//         ],
//       },
//     }),
// });

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { fetchProfile, updateProfile } from '@/store/slices/userSlice';
import productReducer from '@/store/slices/productSlice';
import cartReducer from '@/store/slices/cartSlice';
import orderReducer from '@/store/slices/orderSlice';
import adminUserReducer from '@/store/slices/adminUserSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    adminUser: adminUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          fetchProfile.fulfilled.type,
          updateProfile.fulfilled.type,
        ],
        ignoredPaths: ['user.profile.createdAt', 'user.profile.updatedAt'],
      },
    }),
});

export default store;