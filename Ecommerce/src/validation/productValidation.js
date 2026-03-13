import AppConstants from "@/constants/AppConstants";

const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;
const URL_REGEX = /^https?:\/\/.+/i;

export const productValidation = Object.freeze({
  name: {
    required: "Product name is required",
    minLength: {
      value: AppConstants.PRODUCT_NAME_MIN_LENGTH,
      message: `Name must be at least ${AppConstants.PRODUCT_NAME_MIN_LENGTH} characters`,
    },
    maxLength: {
      value: AppConstants.PRODUCT_NAME_MAX_LENGTH,
      message: `Name must be less than ${AppConstants.PRODUCT_NAME_MAX_LENGTH} characters`,
    },
  },

  description: {
    required: "Description is required",
    minLength: {
      value: AppConstants.PRODUCT_DESCRIPTION_MIN_LENGTH,
      message: `Description must be at least ${AppConstants.PRODUCT_DESCRIPTION_MIN_LENGTH} characters`,
    },
  },

  price: {
    required: "Price is required",
    min: {
      value: AppConstants.PRODUCT_PRICE_MIN,
      message: `Price must be at least ${AppConstants.PRODUCT_PRICE_MIN}`,
    },
    pattern: {
      value: PRICE_REGEX,
      message: "Please enter a valid price (e.g. 99.99)",
    },
  },

  category: {
    required: "Category is required",
    validate: (value = "") => value.trim() !== "" || "Invalid category",
  },

  imageUrl: {
    required: "Image URL is required",
    pattern: {
      value: URL_REGEX,
      message: "Please enter a valid image URL",
    },
  },
});

export default productValidation;