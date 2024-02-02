import React from "react";

function useLocalStorageSimple<T>(
  storageKey: string,
  fallbackState: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState(
    // @ts-ignore
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  );

  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
}

export default useLocalStorageSimple;
