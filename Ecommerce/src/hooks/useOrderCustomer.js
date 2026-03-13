import { useState, useEffect } from "react";
import { fetchUserProfile } from "@/services/userService";

const useOrderCustomer = (uid = "") => {
  const [customer, setCustomer] = useState(null);
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (uid) {
      const fetchCustomer = async () => {
        setLoadingCustomer(true);
        setError(null);
        try {
          const { data, error: fetchError } = await fetchUserProfile({ uid });
          if (isMounted) {
            if (data) {
              setCustomer(data);
            } else {
              setError(fetchError || "Customer profile not found.");
            }
          }
        } catch (err) {
          if (isMounted) {
            setError(err.message || "Failed to fetch customer.");
          }
        } finally {
          if (isMounted) {
            setLoadingCustomer(false);
          }
        }
      };
      fetchCustomer();
    } else {
      setCustomer(null);
      setLoadingCustomer(false);
      setError(null);
    }

    return () => {
      isMounted = false;
    };
  }, [uid]);

  return { customer, loadingCustomer, error };
};

export default useOrderCustomer;
