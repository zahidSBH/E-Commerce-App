// import { initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import * as SecureStore from "expo-secure-store";

// const firebaseConfig = {
//   apiKey: "AIzaSyD09K5Z7c1j639EY6bndaQyDr_8NFBuk3k",
//   authDomain: "ecommerce-a0fa3.firebaseapp.com",
//   projectId: "ecommerce-a0fa3",
//   storageBucket: "ecommerce-a0fa3.firebasestorage.app",
//   messagingSenderId: "898036280152",
//   appId: "1:898036280152:web:2133d6a196f8dd6a24532d",
// };

// const SecureStoreAdapter = {
//   getItem: (key) => SecureStore.getItemAsync(key),
//   setItem: (key, value) => SecureStore.setItemAsync(key, value),
//   removeItem: (key) => SecureStore.deleteItemAsync(key),
// };

// const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(SecureStoreAdapter),
// });

// export { auth };
// export default app;

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD09K5Z7c1j639EY6bndaQyDr_8NFBuk3k",
  authDomain: "ecommerce-a0fa3.firebaseapp.com",
  projectId: "ecommerce-a0fa3",
  storageBucket: "ecommerce-a0fa3.firebasestorage.app",
  messagingSenderId: "898036280152",
  appId: "1:898036280152:web:2133d6a196f8dd6a24532d",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
export default app;
