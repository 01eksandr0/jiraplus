import { useUserStore } from "@/stores/user";
import React, { useState } from "react";
import { MdLogout } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { useAuthStore } from "@/stores/auth";

const HeaderUserDropdown = () => {
  const user = useUserStore((s) => s.user);
  const setToken = useAuthStore((s) => s.setToken);
  const [isVisible, setVisible] = useState(false);

  const logout = () => {
    setToken("");
  };

  return (
    <div className="relative">
      <div
        onClick={() => setVisible(!isVisible)}
        className="h-[40px] w-[40px] rounded-full overflow-hidden cursor-pointer"
      >
        <img
          height={40}
          width={40}
          src={user?.avatar ? user.avatar : "/default-user.webp"}
          alt="user avatar"
        />
      </div>
      {isVisible && (
        <div className="absolute bg-white  rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)]  w-[200px] right-0 top-[46px]">
          <p className="flex items-center p-1 border-b gap-x-3 py-2 px-3  text-sm text-stone-800">
            {user?.full_name}
          </p>
          <div className="p-1">
            <p className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
              <CiCreditCard1 />
              My account
            </p>
            <button
              onClick={logout}
              className="flex items-center w-full gap-x-3 py-2 px-3 rounded-lg text-sm text-stone-800 hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
              <MdLogout /> Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderUserDropdown;
