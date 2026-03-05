import AppConstants from "@/constants/AppConstants";
import {
  validateEmailPayload,
  validatePasswordPayload,
} from "@/validation/authValidation";

export const validateSignUpPayload = ({ fullName, email, password }) => {
  if (
    !fullName ||
    typeof fullName !== "string" ||
    fullName.trim().length === 0
  ) {
    return "Full name is required.";
  }
  if (fullName.trim().length < AppConstants.FULL_NAME_MIN_LENGTH) {
    return `Full name must be at least ${AppConstants.FULL_NAME_MIN_LENGTH} characters.`;
  }
  if (fullName.trim().length > AppConstants.FULL_NAME_MAX_LENGTH) {
    return `Full name must be less than ${AppConstants.FULL_NAME_MAX_LENGTH} characters.`;
  }
  if (!AppConstants.FULL_NAME_PATTERN.test(fullName.trim())) {
    return "Full name can only contain letters and spaces.";
  }

  const emailError = validateEmailPayload(email);
  if (emailError) return emailError;
  const passwordError = validatePasswordPayload(password);
  if (passwordError) return passwordError;
  return null;
};

export const validateLoginPayload = ({ email, password }) => {
  const emailError = validateEmailPayload(email);
  if (emailError) return emailError;
  const passwordError = validatePasswordPayload(password);
  if (passwordError) return passwordError;
  return null;
};
