"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
// @ts-ignore
import { Button, Input } from "jiraplus-ui";
import axios from "axios";

type Inputs = {
  full_name: string;
  email: string;
  password: string;
};

const Page = () => {
  const router = useRouter();
  const [resError, setResError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/auth/register",
        data
      );
      await router.replace("/login");
    } catch (error) {
      setResError("Invalid email or password");
    }
  };

  return (
    <div className="p-4 sm:p-8 w-[300px] relative bg-white rounded-xl shadow sm:w-full max-w-[500px] z-[1]">
      <h1 className="text-2xl mb-[16px] text-center font-semibold text-gray-800 dark:text-neutral-200">
        Register
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-6 w-full">
        <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-neutral-200">
          Full name
          <Input
            type="text"
            className="mt-[8px]"
            error={errors.full_name?.message}
            {...register("full_name", { required: "Full name is required" })}
          />
        </label>

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

        <Button type="submit" onClick={() => setResError("")}>
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default Page;
