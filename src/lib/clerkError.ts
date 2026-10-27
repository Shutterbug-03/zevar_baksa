/** Loose shape of the errors Clerk (and thrown Errors) surface to the UI. */
export type ClerkErrorLike = {
  code?: string;
  message?: string;
  longMessage?: string;
};

/** Narrow an unknown caught/returned error so its fields can be read safely. */
export const asErr = (e: unknown): ClerkErrorLike => (e ?? {}) as ClerkErrorLike;
