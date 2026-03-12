import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import theme from "@/constants/theme";
import ScreenHeader from "@/components/common/ScreenHeader";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import SuccessModal from "@/components/common/SuccessModal";
import ErrorModal from "@/components/common/ErrorModal";
import {
  updateOrder,
  selectOrderStatus,
  selectOrderById,
} from "@/store/slices/orderSlice";
import { fetchUserProfile } from "@/services/userService";
import SliceStatus from "@/enums/SliceStatus";
import formatDate from "@/utils/formatDate";
 
import OrderCustomerCard from "@/components/admin/OrderCustomerCard";
import OrderItemsCard from "@/components/admin/OrderItemsCard";
import OrderShippingCard from "@/components/admin/OrderShippingCard";
import OrderStatusManager from "@/components/admin/OrderStatusManager";

const AdminOrderDetails = ({ route, navigation }) => {
  const orderId = route?.params?.orderId;
  const dispatch = useDispatch();
  const order = useSelector(selectOrderById(orderId));
  const status = useSelector(selectOrderStatus);

  const [selectedStatus, setSelectedStatus] = useState(order?.status);
  const [customer, setCustomer] = useState(null);
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    if (order?.uid) {
      const fetchCustomer = async () => {
        setLoadingCustomer(true);
        try {
          const { data, error } = await fetchUserProfile({ uid: order.uid });
          if (isMounted) {
            if (data) {
              setCustomer(data);
            }
          }
        } catch (err) {
         
        } finally {
          if (isMounted) setLoadingCustomer(false);
        }
      };
      fetchCustomer();
    }

    return () => {
      isMounted = false;
    };
  }, [order?.uid]);

 
  useEffect(() => {
    if (order?.status) {
      setSelectedStatus(order.status);
    }
  }, [order?.status]);

  if (!orderId || !order) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Order not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleUpdateStatus = () => {
    if (selectedStatus === order.status) return;
    setShowConfirmModal(true);
  };

  const confirmUpdateStatus = async () => {
    const result = await dispatch(
      updateOrder({ orderId, status: selectedStatus })
    );
    setShowConfirmModal(false);
    if (!result.error) {
      setShowSuccessModal(true);
    } else {
      setErrorMessage(result.error || "Failed to update order status.");
      setShowErrorModal(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Order Details"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <OrderCustomerCard customer={customer} loading={loadingCustomer} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Order Information</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Invoice:</Text>
            <Text style={styles.infoValue}>{order?.invoiceNumber || "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Placed On:</Text>
            <Text style={styles.infoValue}>
              {formatDate(order?.placedAt, true)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Payment:</Text>
            <Text style={styles.infoValue}>{order?.paymentMethod || "N/A"}</Text>
          </View>
        </View>

        <OrderStatusManager
          currentStatus={order.status}
          selectedStatus={selectedStatus}
          onStatusSelect={setSelectedStatus}
          onUpdateStatus={handleUpdateStatus}
          updateStatus={status}
        />

        <OrderItemsCard items={order.items} total={order.total} />

        <OrderShippingCard address={order.address} />
      </ScrollView>

      <ConfirmationModal
        visible={showConfirmModal}
        title="Update Status"
        message={`Are you sure you want to update the status to ${selectedStatus}?`}
        onConfirm={confirmUpdateStatus}
        onClose={() => setShowConfirmModal(false)}
        loading={status === SliceStatus.LOADING}
        confirmLabel="Update"
      />

      <SuccessModal
        visible={showSuccessModal}
        message="Order status has been updated successfully."
        onClose={() => setShowSuccessModal(false)}
      />

      <ErrorModal
        visible={showErrorModal}
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl * 2,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  },
  backButton: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  backButtonText: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeightBold,
  },
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xs,
  },
  infoLabel: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.textSecondary,
  },
  infoValue: {
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightSemiBold,
    color: theme.colors.textPrimary,
  },
});

export default AdminOrderDetails;
