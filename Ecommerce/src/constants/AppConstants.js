const AppConstants = Object.freeze({
  
  FULL_NAME_MIN_LENGTH: 2,
  FULL_NAME_MAX_LENGTH: 50,
  PASSWORD_MIN_LENGTH: 8,
 
  FULL_NAME_PATTERN: /^[a-zA-Z\s]+$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_PATTERN: /^(?=.*[A-Z])(?=.*[0-9])/,
});

export default AppConstants;