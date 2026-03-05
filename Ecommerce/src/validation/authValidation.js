import AppConstants from "@/constants/AppConstants";

export const authValidation = Object.freeze({
  fullName: {
    required: "Full name is required",
    minLength: {
      value: AppConstants.FULL_NAME_MIN_LENGTH,
      message: `Name must be at least ${AppConstants.FULL_NAME_MIN_LENGTH} characters`,
    },
    maxLength: {
      value: AppConstants.FULL_NAME_MAX_LENGTH,
      message: `Name must be less than ${AppConstants.FULL_NAME_MAX_LENGTH} characters`,
    },
    pattern: {
      value: AppConstants.FULL_NAME_PATTERN,
      message: "Name can only contain letters and spaces",
    },
  },

  email: {
    required: "Email address is required",
    pattern: {
      value: AppConstants.EMAIL_PATTERN,
      message: "Please enter a valid email address",
    },
  },

  password: {
    required: "Password is required",
    minLength: {
      value: AppConstants.PASSWORD_MIN_LENGTH,
      message: `Password must be at least ${AppConstants.PASSWORD_MIN_LENGTH} characters`,
    },
    pattern: {
      value: AppConstants.PASSWORD_PATTERN,
      message:
        "Password must contain at least one uppercase letter and one number",
    },
  },

  confirmPassword: (getValues) => ({
    required: "Please confirm your password",
    validate: (value) =>
      value === getValues("password") || "Passwords do not match",
  }),
});

export function validateEmailPayload(email) {
  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return "Email address is required.";
  }
  if (!AppConstants.EMAIL_PATTERN.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  return null;
}

export function validatePasswordPayload(password) {
  if (!password || typeof password !== "string" || password.length === 0) {
    return "Password is required.";
  }
  if (password.length < AppConstants.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${AppConstants.PASSWORD_MIN_LENGTH} characters.`;
  }
  return null;
}

export default authValidation;
