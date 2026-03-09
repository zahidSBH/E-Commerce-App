import { createSlice } from "@reduxjs/toolkit";
import createOrderModel from "@/models/orderModel";
import PaymentMethod from "@/enums/PaymentMethod";

const initialState = {
  currentOrder: null,
  address: {
    fullName: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
  },
  paymentMethod: PaymentMethod.CASH_ON_DELIVERY,
  transactionId: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = { ...state.address, ...action.payload };
    },

    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload ?? PaymentMethod.CASH_ON_DELIVERY;
      if (state.paymentMethod === PaymentMethod.CASH_ON_DELIVERY) {
        state.transactionId = "";
      }
    },

    setTransactionId: (state, action) => {
      state.transactionId = action.payload ?? "";
    },

    placeOrder: (state, action) => {
      const {
        items = [],
        subtotal = 0,
        deliveryFee = 0,
      } = action.payload ?? {};
      state.currentOrder = createOrderModel({
        items,
        address: state.address,
        paymentMethod: state.paymentMethod,
        transactionId: state.transactionId,
        subtotal,
        deliveryFee,
        total: subtotal + deliveryFee,
      });
    },

    clearOrder: (state) => {
      state.currentOrder = null;
      state.transactionId = "";
    },
  },
});

const selectAddress = (state) => state.order.address;
const selectPaymentMethod = (state) => state.order.paymentMethod;
const selectTransactionId = (state) => state.order.transactionId;
const selectCurrentOrder = (state) => state.order.currentOrder;

export const {
  setAddress,
  setPaymentMethod,
  setTransactionId,
  placeOrder,
  clearOrder,
} = orderSlice.actions;

export {
  selectAddress,
  selectPaymentMethod,
  selectTransactionId,
  selectCurrentOrder,
};

export default orderSlice.reducer;
