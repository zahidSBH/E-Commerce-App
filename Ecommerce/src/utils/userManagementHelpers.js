import UserRole from "@/enums/UserRole";

const countByRole = (users = [], role = "") =>
  users.filter((u) => u.role === role).length;

const countDisabled = (users = []) => users.filter((u) => u.isDisabled).length;

const buildSections = (filteredUsers = []) => {
  const admins = filteredUsers.filter((u) => u.role === UserRole.ADMIN);
  const customers = filteredUsers.filter((u) => u.role === UserRole.USER);
  const sections = [];
  if (admins.length > 0) {
    sections.push({ title: "Admins", count: admins.length, data: admins });
  }
  if (customers.length > 0) {
    sections.push({
      title: "Customers",
      count: customers.length,
      data: customers,
    });
  }
  return sections;
};

const buildRoleConfirmMessage = (user = {}, newRole = "") => {
  const action =
    newRole === UserRole.ADMIN
      ? "grant admin access to"
      : "revoke admin role from";
  return `Are you sure you want to ${action} ${user.fullName}?`;
};

const buildStatusConfirmMessage = (user = {}, isDisabling = false) => {
  const action = isDisabling ? "disable" : "enable";
  return `Are you sure you want to ${action} ${user.fullName}'s account?`;
};

export {
  countByRole,
  countDisabled,
  buildSections,
  buildRoleConfirmMessage,
  buildStatusConfirmMessage,
};
