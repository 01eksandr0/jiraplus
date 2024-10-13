"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "@/components/UI/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/UI/Button";

type Inputs = {
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
    const result = await signIn("credentials", {
      redirect: false,
      ...data,
    });

    if (!result?.error) {
      router.replace("/");
    } else {
      setResError("Invalid email or password");
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

        <Button type="submit" onClick={() => setResError("")}>
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default Page;
