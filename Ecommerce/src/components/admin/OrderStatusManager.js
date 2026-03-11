import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";
import OrderStatus from "@/enums/OrderStatus";
import SliceStatus from "@/enums/SliceStatus";

const STATUS_LIST = Object.values(OrderStatus);

const StatusButton = React.memo(({ statusValue, isSelected, onSelect }) => (
  <TouchableOpacity
    style={[
      styles.statusOption,
      isSelected && styles.statusOptionSelected,
    ]}
    onPress={() => onSelect(statusValue)}
  >
    <Text
      style={[
        styles.statusOptionText,
        isSelected && styles.statusOptionTextSelected,
      ]}
    >
      {statusValue}
    </Text>
  </TouchableOpacity>
));

const OrderStatusManager = ({
  currentStatus = null,
  selectedStatus = null,
  onStatusSelect = () => {},
  onUpdateStatus = () => {},
  updateStatus = SliceStatus.IDLE,
}) => {
  const isDisabled =
    selectedStatus === currentStatus || updateStatus === SliceStatus.LOADING;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons
          name="refresh-circle-outline"
          size={theme.iconSizes.sm}
          color={theme.colors.primary}
        />
        <Text style={styles.sectionTitle}>Manage Status</Text>
      </View>
      <Text style={styles.currentStatusLabel}>
        Current Status:{" "}
        <Text style={styles.currentStatusValue}>{currentStatus || "N/A"}</Text>
      </Text>
      <View style={styles.statusGrid}>
        {STATUS_LIST.map((statusValue) => (
          <StatusButton
            key={statusValue}
            statusValue={statusValue}
            isSelected={selectedStatus === statusValue}
            onSelect={onStatusSelect}
          />
        ))}
      </View>
      <TouchableOpacity
        style={[
          styles.updateButton,
          isDisabled && styles.updateButtonDisabled,
        ]}
        onPress={onUpdateStatus}
        disabled={isDisabled}
      >
        {updateStatus === SliceStatus.LOADING ? (
          <ActivityIndicator color={theme.colors.white} />
        ) : (
          <Text style={styles.updateButtonText}>Update Status</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: theme.elevation.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  currentStatusLabel: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  currentStatusValue: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
  },
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  statusOption: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  statusOptionSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryFaded,
  },
  statusOptionText: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textSecondary,
  },
  statusOptionTextSelected: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeightBold,
  },
  updateButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
  },
  updateButtonDisabled: {
    opacity: 0.5,
  },
  updateButtonText: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.fontSizeMD,
  },
});

export default React.memo(OrderStatusManager);
