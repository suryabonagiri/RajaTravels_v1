"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { smoothScrollTo } from "@/lib/utils";

/**
 * Handles /#section deep links after client navigations and first paint,
 * so mobile nav items land under the fixed header correctly.
 */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      // Wait for layout/paint so section positions are correct on phones
      window.requestAnimationFrame(() => {
        window.setTimeout(() => smoothScrollTo(id), 60);
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [pathname]);

  return null;
}
