"use client";

import { useSession } from "next-auth/react";

export default function useShowPrice() {
  const { status } = useSession();
  const showPrice = status === "authenticated";
  return { status, showPrice, isAuthenticated: showPrice };
}

