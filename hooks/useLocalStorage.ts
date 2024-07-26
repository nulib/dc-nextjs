import { useCallback, useEffect, useState } from "react";

function useLocalStorage(key: string, initialValue: string) {
  // Get the initial value from localStorage or use the provided initialValue
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          return JSON.parse(item);
        } else {
          // If no item exists, set the initial value in localStorage
          window.localStorage.setItem(key, JSON.stringify(initialValue));
          return initialValue;
        }
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    }
  });

  // Function to update localStorage and notify other components
  const setValue = useCallback(
    (value: any) => {
      if (typeof window !== "undefined") {
        try {
          const valueToStore =
            value instanceof Function ? value(storedValue) : value;
          setStoredValue(valueToStore);
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          window.dispatchEvent(new Event("local-storage"));
        } catch (error) {
          console.error(error);
        }
      }
    },
    [key, storedValue],
  );

  // Listen for changes in other components
  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window !== "undefined") {
        try {
          const item = window.localStorage.getItem(key);
          if (item) {
            setStoredValue(JSON.parse(item));
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    window.addEventListener("local-storage", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("local-storage", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
