import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Returns `true` only after the component has mounted on the client.
 * Use this to guard any Zustand persisted-store reads that would
 * cause SSR/client HTML mismatches (hydration errors).
 */
export function useHydrated() {
  // false on the server and during hydration, true once on the client
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}
