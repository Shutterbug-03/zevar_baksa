import { useEffect, useState } from "react";

/**
 * Returns `true` only after the component has mounted on the client.
 * Use this to guard any Zustand persisted-store reads that would
 * cause SSR/client HTML mismatches (hydration errors).
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
