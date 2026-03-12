import React from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DetailRow from "@/components/admin/users/DetailRow";
import SectionTitle from "@/components/admin/users/SectionTitle";
import SelfWarning from "@/components/admin/users/SelfWarning";
import OrderHistoryItem from "@/components/admin/users/OrderHistoryItem";
import ActionButton from "@/components/admin/users/ActionButton";
import {
  getAvatarInitial,
  formatDate,
  isSelfAccount,
} from "@/utils/userDetailHelpers";
import styles from "@/components/admin/users/UserDetailModal.styles";
import theme from "@/constants/theme";
import UserRole from "@/enums/UserRole";

const UserDetailModal = ({
  visible = false,
  user = null,
  currentAdminUid = "",
  orders = [],
  isLoadingOrders = false,
  isActioning = false,
  onClose = () => {},
  onRoleChange = () => {},
  onStatusChange = () => {},
}) => {
  if (!user) return null;

  const isAdmin = user.role === UserRole.ADMIN;
  const isDisabled = user.isDisabled ?? false;
  const isSelf = isSelfAccount(user.uid, currentAdminUid);

  const handleRoleToggle = () => {
    const newRole = isAdmin ? UserRole.USER : UserRole.ADMIN;
    onRoleChange(user.uid, newRole);
  };

  const handleStatusToggle = () => {
    onStatusChange(user.uid, !isDisabled);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>User Details</Text>
          <TouchableOpacity
            onPress={onClose}
            hitSlop={styles.hitSlop}
            accessibilityRole="button"
            accessibilityLabel="Close user details"
          >
            <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {getAvatarInitial(user.fullName ?? "")}
              </Text>
            </View>
            <Text style={styles.userName}>{user.fullName ?? ""}</Text>
            <Text style={styles.userEmail}>{user.email ?? ""}</Text>

            {isSelf && (
              <View style={styles.selfBadge}>
                <Text style={styles.selfBadgeText}>You</Text>
              </View>
            )}
          </View>

          <SectionTitle title="Account Info" />
          <View style={styles.detailsCard}>
            <DetailRow icon="shield-outline" label="Role" value={user.role} />
            <View style={styles.rowDivider} />
            <DetailRow
              icon="ellipse-outline"
              label="Status"
              value={isDisabled ? "Disabled" : "Active"}
            />
            <View style={styles.rowDivider} />
            <DetailRow
              icon="calendar-outline"
              label="Joined"
              value={formatDate(user.createdAt)}
            />
          </View>

          <SectionTitle title="Actions" />
          {isSelf ? (
            <SelfWarning />
          ) : (
            <>
              <View style={styles.actionsRow}>
                <ActionButton
                  label={isAdmin ? "Revoke Admin" : "Make Admin"}
                  icon={
                    isAdmin ? "shield-off-outline" : "shield-checkmark-outline"
                  }
                  color={theme.colors.primary}
                  onPress={handleRoleToggle}
                  disabled={isActioning}
                />
                <ActionButton
                  label={isDisabled ? "Enable Account" : "Disable Account"}
                  icon={isDisabled ? "checkmark-circle-outline" : "ban-outline"}
                  color={isDisabled ? theme.colors.success : theme.colors.error}
                  onPress={handleStatusToggle}
                  disabled={isActioning}
                />
              </View>

              {isActioning && (
                <ActivityIndicator
                  size="small"
                  color={theme.colors.primary}
                  style={styles.actioning}
                />
              )}
            </>
          )}

          <SectionTitle title={`Order History (${orders.length})`} />

          {isLoadingOrders ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : orders.length === 0 ? (
            <Text style={styles.emptyOrders}>No orders yet</Text>
          ) : (
            <View style={styles.ordersCard}>
              {orders.map((order, index) => (
                <View key={`${order.invoiceNumber}-${index}`}>
                  <OrderHistoryItem order={order} />
                  {index < orders.length - 1 && (
                    <View style={styles.rowDivider} />
                  )}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default UserDetailModal;