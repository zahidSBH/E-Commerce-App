const validationRules = Object.freeze({
  fullName: {
    required: 'Full name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
    maxLength: {
      value: 50,
      message: 'Name must be less than 50 characters',
    },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: 'Name can only contain letters and spaces',
    },
  },

  email: {
    required: 'Email address is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
  },

  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[0-9])/,
      message: 'Password must contain at least one uppercase letter and one number',
    },
  },

  confirmPassword: (getValues) => ({
    required: 'Please confirm your password',
    validate: (value) =>
      value === getValues('password') || 'Passwords do not match',
  }),
});

export default validationRules;