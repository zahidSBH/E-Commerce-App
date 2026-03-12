import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";
import PrimaryButton from "@/components/PrimaryButton";

const SuccessModal = ({
  visible = false,
  onClose = () => {},
  title = "Success",
  message = "",
  buttonLabel = "Done",
}) => {
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
              <View style={styles.iconContainer}>
                <Ionicons
                  name="checkmark-circle"
                  size={64}
                  color={theme.colors.success}
                />
              </View>
              
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              
              <PrimaryButton
                label={buttonLabel}
                onPress={onClose}
              />
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
    alignItems: "center",
    ...theme.shadows.modal,
  },
  iconContainer: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    textAlign: "center",
  },
  message: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default React.memo(SuccessModal);
