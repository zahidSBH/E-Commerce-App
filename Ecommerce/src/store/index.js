import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "user/fetchProfile/fulfilled",
          "user/updateProfile/fulfilled",
        ],
        ignoredPaths: ["user.profile.createdAt", "user.profile.updatedAt"],
      },
    }),
});

export default store;
