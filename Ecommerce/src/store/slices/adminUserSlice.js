import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllUsers,
  fetchUserOrders,
  updateUserRole,
  toggleUserStatus,
} from "@/services/userService";
import SliceStatus from "@/enums/SliceStatus";

const initialState = {
  users: [],
  selectedUser: null,
  selectedUserOrders: [],
  status: SliceStatus.IDLE,
  ordersStatus: SliceStatus.IDLE,
  actionStatus: SliceStatus.IDLE,
  error: null,
  ordersError: null,
  actionError: null,
};

const loadAllUsers = createAsyncThunk(
  "adminUser/loadAllUsers",
  async (_, { rejectWithValue }) => {
    const { data, error } = await fetchAllUsers();
    if (error) return rejectWithValue(error);
    return data ?? [];
  },
);

const loadUserOrders = createAsyncThunk(
  "adminUser/loadUserOrders",
  async ({ uid = "" }, { rejectWithValue }) => {
    const { data, error } = await fetchUserOrders({ uid });
    if (error) return rejectWithValue(error);
    return data ?? [];
  },
);

const changeUserRole = createAsyncThunk(
  "adminUser/changeUserRole",
  async ({ uid = "", role = "" }, { rejectWithValue }) => {
    const { error } = await updateUserRole({ uid, role });
    if (error) return rejectWithValue(error);
    return { uid, role };
  },
);

const changeUserStatus = createAsyncThunk(
  "adminUser/changeUserStatus",
  async ({ uid = "", isDisabled = false }, { rejectWithValue }) => {
    const { error } = await toggleUserStatus({ uid, isDisabled });
    if (error) return rejectWithValue(error);
    return { uid, isDisabled };
  },
);

const updateUserInState = (state, uid, updater) => {
  const user = state.users.find((u) => u.uid === uid);
  if (user) updater(user);

  if (state.selectedUser?.uid === uid) {
    updater(state.selectedUser);
  }
};

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload ?? null;
      state.selectedUserOrders = [];
      state.ordersStatus = SliceStatus.IDLE;
    },

    clearSelectedUser: (state) => {
      state.selectedUser = null;
      state.selectedUserOrders = [];
      state.ordersStatus = SliceStatus.IDLE;
    },

    resetActionStatus: (state) => {
      state.actionStatus = SliceStatus.IDLE;
      state.actionError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loadAllUsers.pending, (state) => {
        state.status = SliceStatus.LOADING;
        state.error = null;
      })
      .addCase(loadAllUsers.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        state.users = action.payload ?? [];
      })
      .addCase(loadAllUsers.rejected, (state, action) => {
        state.status = SliceStatus.FAILED;
        state.error = action.payload ?? action.error?.message;
      })

      .addCase(loadUserOrders.pending, (state) => {
        state.ordersStatus = SliceStatus.LOADING;
        state.ordersError = null;
      })
      .addCase(loadUserOrders.fulfilled, (state, action) => {
        state.ordersStatus = SliceStatus.SUCCEEDED;
        state.selectedUserOrders = action.payload ?? [];
      })
      .addCase(loadUserOrders.rejected, (state, action) => {
        state.ordersStatus = SliceStatus.FAILED;
        state.ordersError = action.payload ?? action.error?.message;
      })

      .addCase(changeUserRole.pending, (state) => {
        state.actionStatus = SliceStatus.LOADING;
        state.actionError = null;
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.actionStatus = SliceStatus.SUCCEEDED;

        const { uid, role } = action.payload;

        updateUserInState(state, uid, (user) => {
          user.role = role;
        });
      })
      .addCase(changeUserRole.rejected, (state, action) => {
        state.actionStatus = SliceStatus.FAILED;
        state.actionError = action.payload ?? action.error?.message;
      })

      .addCase(changeUserStatus.pending, (state) => {
        state.actionStatus = SliceStatus.LOADING;
        state.actionError = null;
      })
      .addCase(changeUserStatus.fulfilled, (state, action) => {
        state.actionStatus = SliceStatus.SUCCEEDED;

        const { uid, isDisabled } = action.payload;

        updateUserInState(state, uid, (user) => {
          user.isDisabled = isDisabled;
        });
      })
      .addCase(changeUserStatus.rejected, (state, action) => {
        state.actionStatus = SliceStatus.FAILED;
        state.actionError = action.payload ?? action.error?.message;
      });
  },
});

const selectAllUsers = (state) => state.adminUser.users ?? [];
const selectSelectedUser = (state) => state.adminUser.selectedUser ?? null;
const selectSelectedUserOrders = (state) =>
  state.adminUser.selectedUserOrders ?? [];
const selectUsersStatus = (state) => state.adminUser.status;
const selectOrdersStatus = (state) => state.adminUser.ordersStatus;
const selectActionStatus = (state) => state.adminUser.actionStatus;
const selectUsersError = (state) => state.adminUser.error;
const selectOrdersError = (state) => state.adminUser.ordersError;
const selectActionError = (state) => state.adminUser.actionError;
const selectTotalUsers = (state) => state.adminUser.users?.length ?? 0;

export const { selectUser, clearSelectedUser, resetActionStatus } =
  adminUserSlice.actions;

export {
  loadAllUsers,
  loadUserOrders,
  changeUserRole,
  changeUserStatus,
  selectAllUsers,
  selectSelectedUser,
  selectSelectedUserOrders,
  selectUsersStatus,
  selectOrdersStatus,
  selectActionStatus,
  selectUsersError,
  selectOrdersError,
  selectActionError,
  selectTotalUsers,
};

export default adminUserSlice.reducer;
