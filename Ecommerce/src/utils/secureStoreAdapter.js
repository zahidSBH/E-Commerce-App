import * as SecureStore from "expo-secure-store";

 
const sanitizeKey = (key = "") => key.replace(/[^a-zA-Z0-9_-]/g, "_");

const secureStoreAdapter = {
  getItem: async (key) => {
    try {
      return await SecureStore.getItemAsync(sanitizeKey(key));
    } catch {
      return null;
    }
  },

  setItem: async (key, value) => {
    try {
      await SecureStore.setItemAsync(sanitizeKey(key), value);
    } catch {
      
    }
  },

  removeItem: async (key) => {
    try {
      await SecureStore.deleteItemAsync(sanitizeKey(key));
    } catch {
      
    }
  },
};

export default secureStoreAdapter;
