import React, { useEffect, useCallback, useMemo, useState } from "react";
import { View, ActivityIndicator, SectionList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "@/components/common/ScreenHeader";
import UserStatsBar from "@/components/admin/users/UserStatsBar";
import UserRow from "@/components/admin/users/UserRow";
import UserDetailModal from "@/components/admin/users/UserDetailModal";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import UserSearchBar from "@/screens/admin/components/UserSearchBar";
import UserSectionHeader from "@/screens/admin/components/UserSectionHeader";
import UserListEmpty from "@/screens/admin/components/UserListEmpty";
import UserListError from "@/screens/admin/components/UserListError";
import useAdminUsers from "@/hooks/useAdminUsers";
import useUserProfile from "@/hooks/useUserProfile";
import useUserManagementConfirm from "@/hooks/useUserManagementConfirm";
import UserRole from "@/enums/UserRole";
import {
  countByRole,
  countDisabled,
  buildSections,
} from "@/utils/userManagementHelpers";
import theme from "@/constants/theme";

const keyExtractor = (item = {}) => item.uid ?? String(Math.random());

const ItemSeparator = React.memo(() => <View style={styles.separator} />);
const SectionSeparator = React.memo(() => (
  <View style={styles.sectionSeparator} />
));

const UserManagement = ({ navigation = {} }) => {
  const { uid: currentAdminUid } = useUserProfile();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    users,
    filteredUsers,
    selectedUser,
    selectedUserOrders,
    isLoading,
    isLoadingOrders,
    isActioning,
    hasError,
    error,
    actionSucceeded,
    fetchUsers,
    fetchOrdersForUser,
    updateRole,
    updateStatus,
    setSelectedUser,
    clearUser,
    clearActionStatus,
  } = useAdminUsers(searchQuery);

  const {
    confirmModal,
    closeConfirmModal,
    confirmRoleChange,
    confirmStatusChange,
  } = useUserManagementConfirm({
    users,
    updateRole,
    updateStatus,
  });

  const sections = useMemo(() => buildSections(filteredUsers), [filteredUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (actionSucceeded) {
      closeConfirmModal();
      clearActionStatus();
    }
  }, [actionSucceeded, closeConfirmModal, clearActionStatus]);

  const handleGoBack = () => navigation.goBack?.();

  const handleUserPress = useCallback(
    (user = {}) => {
      setSelectedUser(user);
      fetchOrdersForUser(user.uid);
    },
    [setSelectedUser, fetchOrdersForUser]
  );

  const handleCloseDetail = useCallback(() => clearUser(), [clearUser]);

  const renderItem = useCallback(
    ({ item }) => <UserRow user={item} onPress={handleUserPress} />,
    [handleUserPress]
  );

  const renderSectionHeader = useCallback(
    ({ section }) => (
      <UserSectionHeader title={section.title} count={section.count} />
    ),
    []
  );

  const renderListHeader = useCallback(
    () => (
      <UserStatsBar
        customers={countByRole(users, UserRole.USER)}
        admins={countByRole(users, UserRole.ADMIN)}
        disabled={countDisabled(users)}
      />
    ),
    [users]
  );

  const renderContent = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }

    if (hasError) return <UserListError message={error} />;

    return (
      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={UserListEmpty}
        ItemSeparatorComponent={ItemSeparator}
        SectionSeparatorComponent={SectionSeparator}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
    );
  }, [
    isLoading,
    hasError,
    error,
    sections,
    renderItem,
    renderSectionHeader,
    renderListHeader,
  ]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScreenHeader onBackPress={handleGoBack} title="User Management" />

      <View style={styles.searchWrapper}>
        <UserSearchBar value={searchQuery} onChange={setSearchQuery} />
      </View>

      {renderContent()}

      <UserDetailModal
        visible={!!selectedUser}
        user={selectedUser}
        currentAdminUid={currentAdminUid}
        orders={selectedUserOrders}
        isLoadingOrders={isLoadingOrders}
        isActioning={isActioning}
        onClose={handleCloseDetail}
        onRoleChange={confirmRoleChange}
        onStatusChange={confirmStatusChange}
      />

      <ConfirmationModal
        visible={confirmModal.visible}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        loading={isActioning}
        onClose={closeConfirmModal}
        onConfirm={confirmModal.onConfirm}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchWrapper: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  listContent: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    flexGrow: 1,
  },
  separator: {
    height: theme.spacing.sm,
  },
  sectionSeparator: {
    height: theme.spacing.lg,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserManagement;