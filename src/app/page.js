"use client";

import LoginV2 from "@/components/Login/LoginV2";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("tenantName")) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden custom-scrollbar2">
      <LoginV2 />
    </div>
  );
}
