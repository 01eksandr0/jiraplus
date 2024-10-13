"use client";

import { SessionProvider } from "next-auth/react";
import ClientCheckAuth from "./ClientCheckAuth";
export default function ClientRootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <ClientCheckAuth>{children}</ClientCheckAuth>
    </SessionProvider>
  );
}
