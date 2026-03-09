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

  const saveAddress = (data = {}) => {
    dispatch(setAddress(data));
  };

  const selectPayment = (method = "") => {
    dispatch(setPaymentMethod(method));
  };

  const saveTransactionId = (id = "") => {
    dispatch(setTransactionId(id));
  };

  const loadOrderHistory = (targetUid = "") => {
    dispatch(fetchOrdersHistory({ uid: targetUid || uid }));
  };

  const submitOrder = async () => {
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
  };

  const resetOrder = () => {
    dispatch(clearOrder());
  };

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
