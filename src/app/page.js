"use client";

import Dashboard from "@/components/Dashboard/Dashboard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("tenantName")) {
      router.push("/reallogin");
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden custom-scrollbar2">
      <Dashboard />
    </div>
  );
}
