"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import HeaderUserDropdown from "./HeaderUserDropdown";
// @ts-ignore
import { Popover } from "jiraplus-ui";
import HeaderProjectsDropdown from "../HeaderProjectsDropdown";

const Header = () => {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  const logOut = async () => {
    setToken("");
    await router.push("/login");
  };

  return (
    <header className="h-[60px]  border-b">
      <div className="px-[20px] h-full sm:px-[60px] flex items-center justify-start">
        <a href="">
          <img src="/logo.png" alt="logo" height={40} width={50} />
        </a>

        <nav className="ml-[100px]">
          <ul className="flex gap-[24px]">
            <li>
              <Popover
                placement="bottom"
                title={
                  <button className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 ">
                    Tasks
                  </button>
                }
              >
                111
              </Popover>
            </li>
            <li>
              <Popover
                placement="bottom"
                title={
                  <button className="flex gap-x-3 lg:gap-x-1.5 py-2 px-3 w-full lg:w-auto items-center text-sm text-start text-stone-800 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100">
                    Projects
                  </button>
                }
              >
                <HeaderProjectsDropdown />
              </Popover>
            </li>
          </ul>
        </nav>

        <div className="ml-auto">
          <HeaderUserDropdown />
        </div>
        {/* <button
          onClick={logOut}
          type="button"
          className="inline-flex ml-auto items-center text-start text-sm font-medium text-stone-800 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:text-stone-500 dark:text-white dark:focus:text-neutral-200"
        >
          Gitlab_Store
        </button> */}
      </div>
    </header>
  );
};

export default Header;
