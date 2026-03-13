import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import SliceStatus from "@/enums/SliceStatus";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../thunks/wishlistThunks";

const initialState = {
  items: [],
  status: SliceStatus.IDLE,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlistState: (state) => {
      state.items = [];
      state.status = SliceStatus.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        state.items = action.payload ?? [];
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        const payload = action.payload ?? {};
        const exists = state.items.find(item => item?.id === payload?.id);
        if (!exists && payload?.id) {
          state.items.push(payload);
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addMatcher(
        isAnyOf(
          getWishlist.pending,
          addToWishlist.pending,
          removeFromWishlist.pending
        ),
        (state) => {
          state.status = SliceStatus.LOADING;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getWishlist.rejected,
          addToWishlist.rejected,
          removeFromWishlist.rejected
        ),
        (state, action) => {
          state.status = SliceStatus.FAILED;
          state.error = action.payload ?? "An error occurred";
        }
      );
  },
});

export const { clearWishlistState } = wishlistSlice.actions;
export default wishlistSlice.reducer;
