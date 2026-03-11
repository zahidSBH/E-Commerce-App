import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import createOrderModel from "@/models/orderModel";
import PaymentMethod from "@/enums/PaymentMethod";
import {
  saveOrder,
  fetchOrders,
  fetchAllOrders,
  updateOrderStatus,
} from "@/services/orderService";
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
  adminOrders: [],
};

const fetchOrdersHistory = createAsyncThunk(
  "order/fetchHistory",
  async ({ uid }, { rejectWithValue }) => {
    const { data, error } = await fetchOrders({ uid });
    if (error) return rejectWithValue(error);
    return data;
  },
);

const fetchAllAdminOrders = createAsyncThunk(
  "order/fetchAllAdminOrders",
  async (_, { rejectWithValue }) => {
    const { data, error } = await fetchAllOrders();
    if (error) return rejectWithValue(error);
    return data;
  },
);

const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ orderId, status }, { rejectWithValue }) => {
    const { data, error } = await updateOrderStatus(orderId, status);
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
      .addCase(fetchAllAdminOrders.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        state.adminOrders = action.payload;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;

      
        const adminIndex = state.adminOrders.findIndex(
          (o) => o.id === action.payload.id,
        );
        if (adminIndex !== -1) {
          state.adminOrders[adminIndex] = {
            ...state.adminOrders[adminIndex],
            ...action.payload,
          };
        }
 
        const historyIndex = state.history.findIndex(
          (o) => o.id === action.payload.id,
        );
        if (historyIndex !== -1) {
          state.history[historyIndex] = {
            ...state.history[historyIndex],
            ...action.payload,
          };
        }
      })
      .addMatcher(
        isAnyOf(
          fetchOrdersHistory.pending,
          savePlacedOrder.pending,
          fetchAllAdminOrders.pending,
          updateOrder.pending,
        ),
        (state) => {
          state.status = SliceStatus.LOADING;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchOrdersHistory.rejected,
          savePlacedOrder.rejected,
          fetchAllAdminOrders.rejected,
          updateOrder.rejected,
        ),
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
const selectAdminOrders = (state) => state.order.adminOrders;
const selectOrderById = (orderId) => (state) =>
  state.order.adminOrders.find((o) => o.id === orderId);

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
  selectAdminOrders,
  selectOrderById,
  fetchOrdersHistory,
  fetchAllAdminOrders,
  updateOrder,
  savePlacedOrder,
};

export default orderSlice.reducer;
