"use client";

import { CartDrawer } from "./CartDrawer";
import { SearchModal } from "./SearchModal";
import { LoginModal } from "./LoginModal";

export function GlobalOverlays() {
  return (
    <>
      <CartDrawer />
      <SearchModal />
      <LoginModal />
    </>
  );
}
