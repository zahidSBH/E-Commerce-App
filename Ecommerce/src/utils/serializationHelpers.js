/**
 * Safely converts a Firestore Timestamp (or POJO version) to a serializable ISO string.
 * This is crucial for Redux compatibility.
 */
const convertTimestamp = (timestamp) => {
  if (!timestamp) return new Date().toISOString();

  // Handle serverTimestamp marker or other non-date objects
  if (typeof timestamp.toDate === "function") {
    try {
      return timestamp.toDate().toISOString();
    } catch (e) {
      console.warn("serializationHelpers: toDate failed", e);
    }
  }

  // Handle POJO Timestamp { seconds, nanoseconds }
  if (typeof timestamp.seconds === "number") {
    try {
      const ms = timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1000000;
      return new Date(ms).toISOString();
    } catch (e) {
      console.warn("serializationHelpers: manual conversion failed", e);
    }
  }

  // Handle serverTimestamp marker from internal Firestore state
  if (timestamp && typeof timestamp === "object" && "_methodName" in timestamp) {
    return new Date().toISOString();
  }

  // If it's already a string or something else, return as is (if string) or fallback
  return typeof timestamp === "string" ? timestamp : new Date().toISOString();
};

export { convertTimestamp };
