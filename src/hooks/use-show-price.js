"use client";

import { useSession } from "next-auth/react";

export default function useShowPrice() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" || Boolean(session?.token?.accessToken);
  return { status, showPrice: isAuthenticated, isAuthenticated };
}

