"use client";

import { usePathname } from "next/navigation";

export default function Providers({ children }) {
  const pathname = usePathname();

  return (
    <div>
      {children}
    </div>
  );
}