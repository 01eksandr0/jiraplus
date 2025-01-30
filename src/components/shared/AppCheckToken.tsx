"use client";

import { useAuthStore } from "@/stores/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "./Loading";
import { useUserStore } from "@/stores/user";

const AppCheckToken = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const [isLoading, setIsLoading] = useState(true);

  const getInfoUser = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/auth/current",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUser(data);
    } catch (error) {
      setToken("");
      console.error("Ошибка при получении данных пользователя", error);
    }
  };

  useEffect(() => {
    if (token) {
      getInfoUser();
      setIsLoading(false);
    } else if (!token && !isLoading) {
      router.replace("/login");
    }
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AppCheckToken;
