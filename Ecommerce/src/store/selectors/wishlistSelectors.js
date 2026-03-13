import { createSelector } from "@reduxjs/toolkit";

export const selectWishlistItems = (state) => state.wishlist.items ?? [];
export const selectWishlistStatus = (state) => state.wishlist.status;
export const selectWishlistError = (state) => state.wishlist.error;

export const selectWishlistCount = createSelector(
  [selectWishlistItems],
  (items = []) => items.length
);

export const selectIsInWishlist = createSelector(
  [selectWishlistItems, (state, productId) => productId],
  (items = [], productId = "") => items.some((item) => item.id === productId)
);
