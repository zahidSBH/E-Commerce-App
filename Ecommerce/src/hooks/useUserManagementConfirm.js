import { useState, useCallback } from "react";
import {
  buildRoleConfirmMessage,
  buildStatusConfirmMessage,
} from "@/utils/userManagementHelpers";

const INITIAL_CONFIRM_STATE = Object.freeze({
  visible: false,
  title: "",
  message: "",
  onConfirm: () => {},
  type: "primary",
});

const useUserManagementConfirm = ({ users = [], updateRole, updateStatus }) => {
  const [confirmModal, setConfirmModal] = useState(INITIAL_CONFIRM_STATE);

  const closeConfirmModal = useCallback(() => {
    setConfirmModal((prev) => ({ ...prev, visible: false }));
  }, []);

  const confirmRoleChange = useCallback(
    (uid = "", newRole = "") => {
      const user = users.find((u) => u.uid === uid);
      if (!user) return;

      setConfirmModal({
        visible: true,
        title: "Change Role",
        message: buildRoleConfirmMessage(user, newRole),
        type: "primary",
        onConfirm: () => updateRole(uid, newRole),
      });
    },
    [users, updateRole]
  );

  const confirmStatusChange = useCallback(
    (uid = "", isDisabled = false) => {
      const user = users.find((u) => u.uid === uid);
      if (!user) return;

      setConfirmModal({
        visible: true,
        title: isDisabled ? "Disable Account" : "Enable Account",
        message: buildStatusConfirmMessage(user, isDisabled),
        type: isDisabled ? "danger" : "success",
        onConfirm: () => updateStatus(uid, isDisabled),
      });
    },
    [users, updateStatus]
  );

  return {
    confirmModal,
    closeConfirmModal,
    confirmRoleChange,
    confirmStatusChange,
  };
};

export default useUserManagementConfirm;