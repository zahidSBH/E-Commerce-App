import OrderStatus from "@/enums/OrderStatus";
import theme from "@/constants/theme";

const ORDER_STATUS_COLOR = Object.freeze({
  [OrderStatus.PENDING]: theme.colors.warning,
  [OrderStatus.PROCESSING]: theme.colors.primary,
  [OrderStatus.SHIPPED]: theme.colors.info,
  [OrderStatus.DELIVERED]: theme.colors.success,
  [OrderStatus.CANCELLED]: theme.colors.error,
});

const ORDER_STATUS_BG_COLOR = Object.freeze({
  [OrderStatus.PENDING]: theme.colors.pendingBg,
  [OrderStatus.PROCESSING]: theme.colors.processingBg,
  [OrderStatus.SHIPPED]: theme.colors.shippedBg,
  [OrderStatus.DELIVERED]: theme.colors.deliveredBg,
  [OrderStatus.CANCELLED]: theme.colors.cancelledBg,
});

const getAvatarInitial = (fullName = "") =>
  fullName?.charAt(0)?.toUpperCase() ?? "?";

const formatDate = (dateStr = "") => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusColor = (status = "") =>
  ORDER_STATUS_COLOR[status] ?? theme.colors.textMuted;

const getStatusBgColor = (status = "") =>
  ORDER_STATUS_BG_COLOR[status] ?? theme.colors.surface;

const isSelfAccount = (userUid = "", currentAdminUid = "") =>
  userUid === currentAdminUid;

export { getAvatarInitial, formatDate, getStatusColor, getStatusBgColor, isSelfAccount };
