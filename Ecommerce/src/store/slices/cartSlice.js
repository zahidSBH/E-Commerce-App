import { createSlice, createSelector } from "@reduxjs/toolkit";
import createCartItemModel from "@/models/cartModel";
import { findByProductId, removeByProductId } from "@/utils/cartHelpers";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload ?? {};
      const existingItem = findByProductId(state.items, product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(
          createCartItemModel({
            id: product.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            category: product.category,
            quantity: 1,
          }),
        );
      }
    },

    removeFromCart: (state, action) => {
      state.items = removeByProductId(state.items, action.payload ?? "");
    },

    incrementQuantity: (state, action) => {
      const item = findByProductId(state.items, action.payload ?? "");
      if (item) item.quantity += 1;
    },

    decrementQuantity: (state, action) => {
      const productId = action.payload ?? "";
      const item = findByProductId(state.items, productId);
      if (!item) return;

      if (item.quantity === 1) {
        state.items = removeByProductId(state.items, productId);
      } else {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

const selectCartItems = (state) => state.cart.items;

const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);

const selectIsInCart = createSelector(
  [selectCartItems, (state, productId) => productId],
  (items, productId) => items.some((item) => item.productId === productId)
);

const selectCartItemByProductId = createSelector(
  [selectCartItems, (state, productId) => productId],
  (items, productId) => findByProductId(items, productId) ?? null
);

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  selectIsInCart,
  selectCartItemByProductId,
};

export default cartSlice.reducer;
