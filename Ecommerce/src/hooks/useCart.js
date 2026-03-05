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
  const isInCart = useSelector(selectIsInCart(productId));
  const cartItem = useSelector(selectCartItemByProductId(productId));

  const addItem = (product = {}) => {
    dispatch(addToCart(product));
  };

  const removeItem = (id = "") => {
    dispatch(removeFromCart(id));
  };

  const increment = (id = "") => {
    dispatch(incrementQuantity(id));
  };

  const decrement = (id = "") => {
    dispatch(decrementQuantity(id));
  };

  const emptyCart = () => {
    dispatch(clearCart());
  };

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
