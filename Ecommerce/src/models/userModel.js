const DEFAULT_USER_MODEL = {
  uid: "",
  fullName: "",
  email: "",
  avatarUrl: null,
  createdAt: null,
  updatedAt: null,
};

export const createUserModel = (data = {}) => {
  return {
    ...DEFAULT_USER_MODEL,
    ...data,
  };
};

export default createUserModel;
