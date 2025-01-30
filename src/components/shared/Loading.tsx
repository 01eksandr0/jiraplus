import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { PiSpinnerGapBold } from "react-icons/pi";

const Loading: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const token =
        JSON.parse(localStorage?.getItem("token") || "{}")?.state?.token || "";
      if (!token) router.replace("/login");
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-white z-[1] flex items-center justify-center">
      <PiSpinnerGapBold className="animate-spin text-emerald-600" size={100} />
    </div>
  );
};

export default Loading;
