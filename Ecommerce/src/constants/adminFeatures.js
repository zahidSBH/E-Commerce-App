import AdminRoutes from "@/enums/AdminRoutes";

const ADMIN_FEATURES = [
  {
    title: "Manage Products",
    subtitle: "Add, edit, or remove products",
    icon: "cube-outline",
    route: AdminRoutes.MANAGE_PRODUCTS,
  },
  {
    title: "Manage Orders",
    subtitle: "View and update order status",
    icon: "list-outline",
    route: AdminRoutes.MANAGE_ORDERS,
  },
  {
    title: "User Management",
    subtitle: "View and manage users",
    icon: "people-outline",
    route: AdminRoutes.MANAGE_USERS,
  },
];

export default ADMIN_FEATURES;