import { useCallback, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  loadAllUsers,
  loadUserOrders,
  changeUserRole,
  changeUserStatus,
  selectUser,
  clearSelectedUser,
  resetActionStatus,
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
} from "@/store/slices/adminUserSlice";
import SliceStatus from "@/enums/SliceStatus";

const useAdminUsers = (searchQuery = "") => {
  const dispatch = useDispatch();

  const {
    users,
    selectedUser,
    selectedUserOrders,
    status,
    ordersStatus,
    actionStatus,
    error,
    ordersError,
    actionError,
    totalUsers,
  } = useSelector((state) => ({
    users: selectAllUsers(state),
    selectedUser: selectSelectedUser(state),
    selectedUserOrders: selectSelectedUserOrders(state),
    status: selectUsersStatus(state),
    ordersStatus: selectOrdersStatus(state),
    actionStatus: selectActionStatus(state),
    error: selectUsersError(state),
    ordersError: selectOrdersError(state),
    actionError: selectActionError(state),
    totalUsers: selectTotalUsers(state),
  }), shallowEqual);

  const isLoading = status === SliceStatus.LOADING;
  const isLoadingOrders = ordersStatus === SliceStatus.LOADING;
  const isActioning = actionStatus === SliceStatus.LOADING;
  const hasError = status === SliceStatus.FAILED;
  const actionSucceeded = actionStatus === SliceStatus.SUCCEEDED;

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];

    const q = searchQuery.trim().toLowerCase();
    if (!q) return users;

    return users.filter(
      (u) =>
        (u.fullName ?? "").toLowerCase().includes(q) ||
        (u.email ?? "").toLowerCase().includes(q),
    );
  }, [users, searchQuery]);

  const fetchUsers = useCallback(() => {
    dispatch(loadAllUsers());
  }, [dispatch]);

  const fetchOrdersForUser = useCallback(
    (uid = "") => {
      dispatch(loadUserOrders({ uid }));
    },
    [dispatch],
  );

  const updateRole = useCallback(
    (uid = "", role = "") => {
      dispatch(changeUserRole({ uid, role }));
    },
    [dispatch],
  );

  const updateStatus = useCallback(
    (uid = "", isDisabled = false) => {
      dispatch(changeUserStatus({ uid, isDisabled }));
    },
    [dispatch],
  );

  const setSelectedUser = useCallback(
    (user = null) => {
      dispatch(selectUser(user));
    },
    [dispatch],
  );

  const clearUser = useCallback(() => {
    dispatch(clearSelectedUser());
  }, [dispatch]);

  const clearActionStatus = useCallback(() => {
    dispatch(resetActionStatus());
  }, [dispatch]);

  return useMemo(
    () => ({
      users,
      filteredUsers,
      selectedUser,
      selectedUserOrders,
      totalUsers,
      status,
      ordersStatus,
      actionStatus,
      error,
      ordersError,
      actionError,
      isLoading,
      isLoadingOrders,
      isActioning,
      hasError,
      actionSucceeded,
      fetchUsers,
      fetchOrdersForUser,
      updateRole,
      updateStatus,
      setSelectedUser,
      clearUser,
      clearActionStatus,
    }),
    [
      users,
      filteredUsers,
      selectedUser,
      selectedUserOrders,
      totalUsers,
      status,
      ordersStatus,
      actionStatus,
      error,
      ordersError,
      actionError,
      isLoading,
      isLoadingOrders,
      isActioning,
      hasError,
      actionSucceeded,
      fetchUsers,
      fetchOrdersForUser,
      updateRole,
      updateStatus,
      setSelectedUser,
      clearUser,
      clearActionStatus,
    ],
  );
};

export default useAdminUsers;
