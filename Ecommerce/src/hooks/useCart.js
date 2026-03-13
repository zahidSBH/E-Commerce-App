import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  selectIsInCart,
  selectCartItemByProductId,
} from "@/store/slices/cartSlice";

const useCart = (productId = "") => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);
  const isInCart = useSelector((state) => selectIsInCart(state, productId));
  const cartItem = useSelector((state) => selectCartItemByProductId(state, productId));

  const addItem = useCallback(
    (product = {}) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  const removeItem = useCallback(
    (id = "") => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );

  const increment = useCallback(
    (id = "") => {
      dispatch(incrementQuantity(id));
    },
    [dispatch]
  );

  const decrement = useCallback(
    (id = "") => {
      dispatch(decrementQuantity(id));
    },
    [dispatch]
  );

  const emptyCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return {
    cartItems,
    cartCount,
    cartTotal,
    isInCart,
    cartItem,
    addItem,
    removeItem,
    increment,
    decrement,
    emptyCart,
  };
};

export default useCart;
