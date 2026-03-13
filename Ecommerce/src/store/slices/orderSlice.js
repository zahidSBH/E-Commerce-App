import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import createOrderModel from "@/models/orderModel";
import PaymentMethod from "@/enums/PaymentMethod";
import SliceStatus from "@/enums/SliceStatus";
import {
  fetchOrdersHistory,
  fetchAllAdminOrders,
  updateOrder,
  savePlacedOrder,
  fetchOrderCount,
} from "@/store/thunks/orderThunks";
import { mergeOrderHistory, updateOrderInList } from "@/utils/orderHelpers";

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
  lastVisible: null,
  hasMore: true,
  totalOrderCount: null,  
};


const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      const payload = action.payload ?? {};
      state.address = { ...state.address, ...payload };
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
      state.lastVisible = null;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersHistory.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        const { data, lastVisible, isRefresh } = action.payload;
        
        if (isRefresh || state.lastVisible === null) {
          state.history = data;
        } else {   
          state.history = mergeOrderHistory(state.history, data);
        }
        
        state.lastVisible = lastVisible;
        state.hasMore = data.length === 5 && lastVisible !== null;
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

        state.adminOrders = updateOrderInList(state.adminOrders, action.payload);
        state.history = updateOrderInList(state.history, action.payload);
      })
      .addCase(fetchOrderCount.fulfilled, (state, action) => {
        state.totalOrderCount = action.payload ?? 0;
      })
      .addMatcher(
        isAnyOf(
          fetchOrdersHistory.pending,
          savePlacedOrder.pending,
          fetchAllAdminOrders.pending,
          updateOrder.pending,
          fetchOrderCount.pending,
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
          fetchOrderCount.rejected,
        ),
        (state, action) => {
          state.status = SliceStatus.FAILED;
          state.error = action.payload;
        },
      );
  },
});

export const {
  setAddress,
  setPaymentMethod,
  setTransactionId,
  placeOrder,
  clearOrder,
  setHistory,
  clearHistory,
} = orderSlice.actions;

export default orderSlice.reducer;
