import { useCallback } from "react";
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
  selectOrderHistory,
  selectOrderStatus,
  fetchOrdersHistory,
  savePlacedOrder,
} from "@/store/slices/orderSlice";

import { selectCartItems, selectCartTotal } from "@/store/slices/cartSlice";
import { selectUserUid } from "@/store/slices/userSlice";

import calculateDeliveryFee from "@/utils/calculateDeliveryFee";
import createOrderModel from "@/models/orderModel";

const useOrder = () => {
  const dispatch = useDispatch();

  const address = useSelector(selectAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const transactionId = useSelector(selectTransactionId);
  const currentOrder = useSelector(selectCurrentOrder);
  const orderHistory = useSelector(selectOrderHistory);
  const status = useSelector(selectOrderStatus);
  const uid = useSelector(selectUserUid);

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);

  const deliveryFee = calculateDeliveryFee(subtotal);
  const total = subtotal + deliveryFee;

  const saveAddress = useCallback(
    (data = {}) => {
      dispatch(setAddress(data));
    },
    [dispatch]
  );

  const selectPayment = useCallback(
    (method = "") => {
      dispatch(setPaymentMethod(method));
    },
    [dispatch]
  );

  const saveTransactionId = useCallback(
    (id = "") => {
      dispatch(setTransactionId(id));
    },
    [dispatch]
  );

  const loadOrderHistory = useCallback(
    (targetUid = "") => {
      dispatch(fetchOrdersHistory({ uid: targetUid || uid }));
    },
    [dispatch, uid]
  );

  const submitOrder = useCallback(async () => {
    const orderData = createOrderModel({
      items: cartItems,
      address,
      paymentMethod,
      transactionId,
      subtotal,
      deliveryFee,
      total,
    });

    return await dispatch(savePlacedOrder({ uid, orderData }));
  }, [
    dispatch,
    uid,
    cartItems,
    address,
    paymentMethod,
    transactionId,
    subtotal,
    deliveryFee,
    total,
  ]);

  const resetOrder = useCallback(() => {
    dispatch(clearOrder());
  }, [dispatch]);

  return {
    address,
    paymentMethod,
    transactionId,
    currentOrder,
    orderHistory,
    status,
    subtotal,
    deliveryFee,
    total,
    saveAddress,
    selectPayment,
    saveTransactionId,
    loadOrderHistory,
    submitOrder,
    resetOrder,
  };
};

export default useOrder;
