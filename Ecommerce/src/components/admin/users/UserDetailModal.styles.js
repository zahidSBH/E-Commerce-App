import { StyleSheet } from 'react-native';
import theme from '@/constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  headerTitle: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
  scrollContent: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  profileSection: {
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.md,
  },
  avatar: {
    width: theme.sizes.iconCircleMD,
    height: theme.sizes.iconCircleMD,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primaryFaded,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  },
  avatarText: {
    fontSize: theme.typography.fontSizeXXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
  },
  userName: {
    fontSize: theme.typography.fontSizeXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  userEmail: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.textMuted,
  },
  selfBadge: {
    backgroundColor: theme.colors.primaryFaded,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    marginTop: theme.spacing.xs,
  },
  selfBadgeText: {
    fontSize: theme.typography.fontSizeXS,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.primary,
  },
  detailsCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  rowDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actioning: {
    marginTop: theme.spacing.xs,
  },
  ordersCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  emptyOrders: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textMuted,
    textAlign: 'center',
    paddingVertical: theme.spacing.md,
  },
});

export default styles;