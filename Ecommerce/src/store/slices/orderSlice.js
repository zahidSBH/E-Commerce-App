import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import createOrderModel from "@/models/orderModel";
import PaymentMethod from "@/enums/PaymentMethod";
import { saveOrder, fetchOrders } from "@/services/orderService";
import SliceStatus from "@/enums/SliceStatus";

const initialState = {
  currentOrder: null,
  history: [],
  status: SliceStatus.IDLE,
  error: null,
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

const fetchOrdersHistory = createAsyncThunk(
  "order/fetchHistory",
  async ({ uid }, { rejectWithValue }) => {
    const { data, error } = await fetchOrders({ uid });
    if (error) return rejectWithValue(error);
    return data;
  },
);

const savePlacedOrder = createAsyncThunk(
  "order/saveOrder",
  async ({ uid, orderData }, { rejectWithValue }) => {
    const { data, error } = await saveOrder({ uid, orderData });
    if (error) return rejectWithValue(error);
    return data;
  },
);

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

    setHistory: (state, action) => {
      state.history = action.payload || [];
    },

    clearHistory: (state) => {
      state.history = [];
      state.status = SliceStatus.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersHistory.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        state.history = action.payload;
      })
      .addCase(savePlacedOrder.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        state.history = [action.payload, ...state.history];
        state.currentOrder = action.payload;
      })
      .addMatcher(
        isAnyOf(fetchOrdersHistory.pending, savePlacedOrder.pending),
        (state) => {
          state.status = SliceStatus.LOADING;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(fetchOrdersHistory.rejected, savePlacedOrder.rejected),
        (state, action) => {
          state.status = SliceStatus.FAILED;
          state.error = action.payload;
        },
      );
  },
});

const selectAddress = (state) => state.order.address;
const selectPaymentMethod = (state) => state.order.paymentMethod;
const selectTransactionId = (state) => state.order.transactionId;
const selectCurrentOrder = (state) => state.order.currentOrder;
const selectOrderHistory = (state) => state.order.history;
const selectOrderStatus = (state) => state.order.status;

export const {
  setAddress,
  setPaymentMethod,
  setTransactionId,
  placeOrder,
  clearOrder,
  setHistory,
  clearHistory,
} = orderSlice.actions;

export {
  selectAddress,
  selectPaymentMethod,
  selectTransactionId,
  selectCurrentOrder,
  selectOrderHistory,
  selectOrderStatus,
  fetchOrdersHistory,
  savePlacedOrder,
};

export default orderSlice.reducer;
