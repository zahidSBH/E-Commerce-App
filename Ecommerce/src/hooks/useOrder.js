import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setAddress,
  setPaymentMethod,
  setTransactionId,
  placeOrder,
  clearOrder,
  clearHistory,
} from "@/store/slices/orderSlice";

import {
  selectAddress,
  selectPaymentMethod,
  selectTransactionId,
  selectCurrentOrder,
  selectOrderHistory,
  selectOrderStatus,
  selectOrderError,
  selectHasMoreOrders,
} from "@/store/selectors/orderSelectors";

import {
  fetchOrdersHistory,
  savePlacedOrder,
  fetchOrderCount,
} from "@/store/thunks/orderThunks";

import { selectCartItems, selectCartTotal } from "@/store/slices/cartSlice";
import { selectUserUid } from "@/store/slices/userSlice";
import { ORDERS_PAGE_LIMIT } from "@/constants/orderConstants";

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
  const error = useSelector(selectOrderError);
  const hasMore = useSelector(selectHasMoreOrders);
  const uid = useSelector(selectUserUid);

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);

  const deliveryFee = useMemo(() => calculateDeliveryFee(subtotal), [subtotal]);
  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);

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
    (targetUid = "", isRefresh = false) => {
    
      if (isRefresh) {
        dispatch(clearHistory());
      }
      
      dispatch(fetchOrdersHistory({ 
        uid: targetUid || uid, 
        pageSize: ORDERS_PAGE_LIMIT,
        isRefresh,
      }));
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

  const resetHistory = useCallback(() => {
    dispatch(clearHistory());
  }, [dispatch]);

  return {
    address,
    paymentMethod,
    transactionId,
    currentOrder,
    orderHistory,
    status,
    error,
    hasMore,
    subtotal,
    deliveryFee,
    total,
    saveAddress,
    selectPayment,
    saveTransactionId,
    loadOrderHistory,
    loadOrderCount: useCallback(
      (targetUid = "") => {
        dispatch(fetchOrderCount({ uid: targetUid || uid }));
      },
      [dispatch, uid]
    ),
    submitOrder,
    resetOrder,
    resetHistory,
  };
};

export default useOrder;
