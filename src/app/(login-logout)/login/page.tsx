"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
// @ts-ignore
import { Button, Input } from "jiraplus-ui";

type Inputs = {
  email: string;
  password: string;
};
const Page = () => {
  const [resError, setResError] = useState("");
  const setToken = useAuthStore((state) => state.setToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/auth/login",
        formData
      );
      if (data?.token) setToken(data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 sm:p-8 w-[300px] relative bg-white rounded-xl shadow sm:w-full max-w-[500px] z-[1]">
      <h1 className="text-2xl mb-[16px] text-center font-semibold text-gray-800 dark:text-neutral-200">
        Sign in
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-6 w-full">
        <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-neutral-200">
          Email address
          <Input
            type="email"
            className="mt-[8px]"
            error={errors.email?.message || resError}
            {...register("email", { required: "Email is required" })}
          />
        </label>

        <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-neutral-200">
          Password
          <Input
            type="password"
            className="mt-[8px]"
            error={errors.password?.message || resError}
            {...register("password", { required: "Password is required" })}
          />
        </label>

        <Button
          className={
            "py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-emerald-600 text-white hover:bg-emerald-700  focus:outline-none duration-300"
          }
          type="submit"
          onClick={() => setResError("")}
        >
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default Page;
