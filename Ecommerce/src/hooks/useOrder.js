import { useDispatch, useSelector } from "react-redux";

import {
  setAddress,
  setPaymentMethod,
  setTransactionId,
  placeOrder,
  clearOrder,
  selectAddress,
  selectPaymentMethod,
  selectTransactionId,
  selectCurrentOrder,
} from "@/store/slices/orderSlice";

import { selectCartItems, selectCartTotal } from "@/store/slices/cartSlice";

import calculateDeliveryFee from "@/utils/calculateDeliveryFee";

const useOrder = () => {
  const dispatch = useDispatch();

  const address = useSelector(selectAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const transactionId = useSelector(selectTransactionId);
  const currentOrder = useSelector(selectCurrentOrder);

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);

  const deliveryFee = calculateDeliveryFee(subtotal);
  const total = subtotal + deliveryFee;

  const saveAddress = (data = {}) => {
    dispatch(setAddress(data));
  };

  const selectPayment = (method = "") => {
    dispatch(setPaymentMethod(method));
  };

  const saveTransactionId = (id = "") => {
    dispatch(setTransactionId(id));
  };

  const submitOrder = () => {
    dispatch(
      placeOrder({
        items: cartItems,
        subtotal,
        deliveryFee,
      }),
    );
  };

  const resetOrder = () => {
    dispatch(clearOrder());
  };

  return {
    address,
    paymentMethod,
    transactionId,
    currentOrder,
    subtotal,
    deliveryFee,
    total,
    saveAddress,
    selectPayment,
    saveTransactionId,
    submitOrder,
    resetOrder,
  };
};

export default useOrder;
