import { Nav } from "./Nav";
import { Footer } from "./Footer";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
