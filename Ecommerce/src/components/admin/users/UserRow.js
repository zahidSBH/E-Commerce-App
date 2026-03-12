import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserRole from '@/enums/UserRole';
import theme from '@/constants/theme';

const ROLE_CONFIG = Object.freeze({
  [UserRole.ADMIN]: {
    label: 'Admin',
    color: theme.colors.primary,
    background: theme.colors.primaryFaded,
    icon: 'shield-checkmark-outline',
  },
  [UserRole.USER]: {
    label: 'User',
    color: theme.colors.textSecondary,
    background: theme.colors.surface,
    icon: 'person-outline',
  },
});

const getRoleConfig = (role = UserRole.USER) =>
  ROLE_CONFIG[role] ?? ROLE_CONFIG[UserRole.USER];

const getAvatarInitial = (fullName = '') =>
  fullName?.charAt(0)?.toUpperCase() ?? '?';

const RoleBadge = ({ role = UserRole.USER }) => {
  const config = getRoleConfig(role);
  return (
    <View style={[styles.badge, { backgroundColor: config.background }]}>
      <Ionicons name={config.icon} size={10} color={config.color} />
      <Text style={[styles.badgeText, { color: config.color }]}>
        {config.label}
      </Text>
    </View>
  );
};

const StatusBadge = ({ isDisabled = false }) => (
  <View
    style={[
      styles.badge,
      {
        backgroundColor: isDisabled
          ? theme.colors.errorFaded
          : theme.colors.successFaded,
      },
    ]}
  >
    <Text
      style={[
        styles.badgeText,
        { color: isDisabled ? theme.colors.error : theme.colors.success },
      ]}
    >
      {isDisabled ? 'Disabled' : 'Active'}
    </Text>
  </View>
);

const UserRow = ({
  user = {},
  onPress = () => {},
}) => {
  const handlePress = () => onPress(user);

  return (
    <TouchableOpacity
      style={[styles.container, user.isDisabled && styles.containerDisabled]}
      onPress={handlePress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`View user ${user.fullName ?? ''}`}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {getAvatarInitial(user.fullName ?? '')}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {user.fullName ?? ''}
        </Text>

        <Text style={styles.email} numberOfLines={1}>
          {user.email ?? ''}
        </Text>

        <View style={styles.badges}>
          <RoleBadge role={user.role} />
          <StatusBadge isDisabled={user.isDisabled} />
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color={theme.colors.textMuted}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.opacity.shadow,
    shadowRadius: 8,
    elevation: theme.elevation.sm,
  },

  containerDisabled: {
    opacity: theme.opacity.disabled,
  },

  avatar: {
    width: theme.sizes.avatarSM,
    height: theme.sizes.avatarSM,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primaryFaded,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
  },

  info: {
    flex: 1,
    gap: theme.spacing.xs,
  },

  name: {
    fontSize: theme.typography.fontSizeMD,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
  },

  email: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textMuted,
  },

  badges: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.badgeGap,
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.badgeVertical,
    borderRadius: theme.borderRadius.full,
  },

  badgeText: {
    fontSize: theme.typography.fontSizeXS,
    fontWeight: theme.typography.fontWeightSemiBold,
  },
});
export default UserRow;