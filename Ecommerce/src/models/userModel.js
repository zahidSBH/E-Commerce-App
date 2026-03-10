import UserRole from "@/enums/UserRole";

const DEFAULT_USER_MODEL = Object.freeze({
  uid: "",
  fullName: "",
  email: "",
  avatarUrl: null,
  role: UserRole.USER,
  createdAt: null,
  updatedAt: null,
});

const sanitizeTimestamp = (value) => {
  if (!value || typeof value !== "object") return value;
  if ("_methodName" in value || "seconds" in value) return null;
  return value;
};

const createUserModel = (data = {}) => ({
  ...DEFAULT_USER_MODEL,
  ...data,
  createdAt: sanitizeTimestamp(data.createdAt),
  updatedAt: sanitizeTimestamp(data.updatedAt),
});

export { DEFAULT_USER_MODEL };
export default createUserModel;
