"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const logOut = async () => {
    await signOut();
    await router.push("/login");
  };

  return (
    <header className="h-[60px] flex items-center justify-between border-b">
      <a className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 bg-stone-100 focus:bg-stone-200 dark:bg-neutral-700 dark:focus:bg-neutral-600 ">
        Projects
      </a>

      <button
        onClick={logOut}
        type="button"
        className="inline-flex items-center text-start text-sm font-medium text-stone-800 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:text-stone-500 dark:text-white dark:focus:text-neutral-200"
      >
        Gitlab_Store
      </button>
    </header>
  );
};

export default Header;
