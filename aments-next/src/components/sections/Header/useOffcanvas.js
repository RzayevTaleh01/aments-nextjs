"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export default function useOffcanvas() {
  const [openId, setOpenId] = useState(null);

  const open = useCallback((id) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);
  const isOpen = useCallback((id) => openId === id, [openId]);

  useEffect(() => {
    const body = document.body;
    if (!body) return;
    const prevOverflow = body.style.overflow;
    if (openId) body.style.overflow = "hidden";
    else body.style.overflow = prevOverflow || "";

    return () => {
      body.style.overflow = prevOverflow || "";
    };
  }, [openId]);

  useEffect(() => {
    return () => {
      const body = document.body;
      if (body) body.style.overflow = "";
    };
  }, []);

  return useMemo(() => ({ openId, open, close, isOpen }), [close, isOpen, open, openId]);
}
