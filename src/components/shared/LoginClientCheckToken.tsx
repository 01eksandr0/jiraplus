"use client";
import React from "react";
import { useAuthStore } from "@/stores/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginClientCheckToken = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    if (token) router.replace("/");
  }, [token]);
  return <>{children}</>;
};

export default LoginClientCheckToken;
