import { configureStore } from '@reduxjs/toolkit';
import userReducer, { fetchProfile, updateProfile } from '@/store/slices/userSlice';
import productReducer from '@/store/slices/productSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
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