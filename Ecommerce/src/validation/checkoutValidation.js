export const checkoutValidation = {
  fullName: {
    required: "Full name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: "Name can only contain letters",
    },
  },

  phone: {
    required: "Phone number is required",
    pattern: {
      value: /^[+]?[\d\s\-()]{7,15}$/,
      message: "Enter a valid phone number",
    },
  },

  street: {
    required: "Street address is required",
    minLength: {
      value: 5,
      message: "Enter a complete street address",
    },
  },

  city: {
    required: "City is required",
    minLength: {
      value: 2,
      message: "Enter a valid city name",
    },
  },

  zip: {
    required: "ZIP code is required",
    pattern: {
      value: /^[0-9]{4,10}$/,
      message: "Enter a valid ZIP code",
    },
  },

  transactionId: {
    required: "Transaction ID is required for online payment",
    minLength: {
      value: 6,
      message: "Transaction ID must be at least 6 characters",
    },
  },
};
