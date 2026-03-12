import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import theme from "@/constants/theme";
import PrimaryButton from "@/components/PrimaryButton";

const ConfirmationModal = ({
  visible = false,
  onClose = () => {},
  onConfirm = () => {},
  title = "",
  message = "",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  type = "primary",
}) => {
  const getConfirmColor = () => {
    switch (type) {
      case "danger":
        return theme.colors.error;
      case "success":
        return theme.colors.success;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={onClose}
                  disabled={loading}
                >
                  <Text style={styles.cancelText}>{cancelLabel}</Text>
                </TouchableOpacity>
                
                <View style={styles.confirmButtonWrapper}>
                  <PrimaryButton
                    label={confirmLabel}
                    onPress={onConfirm}
                    loading={loading}
                    style={{ backgroundColor: getConfirmColor() }}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.modalOverlay,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.modal,
  },
  title: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  message: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  cancelButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  cancelText: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeightMedium,
  },
  confirmButtonWrapper: {
    minWidth: 120,
  },
});

export default React.memo(ConfirmationModal);
