import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Input } from "../UI/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Dialog } from "../UI/Dialog";
import SearchSelect from "./header/SearchSelect";
import { useUserStore } from "@/stores/user";
import { IProject } from "@/types/project";

type Inputs = {
  name: string;
};

const HeaderProjectsDropdown = () => {
  const token = useAuthStore((s) => s.token);
  const user = useUserStore((s) => s.user);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isVisible, setVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [users, setUsers] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/projects",
        {
          params: {
            userId: user?._id,
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setProjects(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject: SubmitHandler<Inputs> = async (formData) => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/projects",
        {
          ...formData,
          users,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      fetchProjects();
      setVisible(false);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <>
      <div className="w-[300px]">
        <div className="max-h-[300px]">
          {projects?.length ? (
            <div>
              <h2 className="border-b justify-center h-[40px] flex items-center font-medium">
                Your projects
              </h2>
              <ul className="p-[10px] max-h-[300px] overflow-auto">
                {projects.map((i) => (
                  <li key={i._id}>
                    <button
                      type="button"
                      className="px-[6px] py-[2px] block w-full  rounded-md hover:bg-gray-100 duration-300 text-start"
                    >
                      {i?.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="h-[50px] flex justify-center items-center">
              You don't have projects
            </p>
          )}
        </div>
        <button
          onClick={() => setVisible(true)}
          className="h-[40px] w-full flex justify-center items-center border-t hover:bg-gray-100 duration-300"
        >
          Create new project
        </button>
      </div>
      <Dialog
        isVisible={isVisible}
        setVisible={(newStatus: boolean) => setVisible(newStatus)}
      >
        <>
          <form
            ref={formRef}
            onSubmit={handleSubmit(createProject)}
            className="p-[20px] flex flex-col gap-[8px]"
          >
            <label>
              Project name
              <Input
                type="text"
                placeholder="Project name"
                error={errors.name?.message}
                {...register("name", { required: "Project name is required" })}
              />
            </label>
            <label>
              Users
              <SearchSelect setUsers={setUsers} />
            </label>
          </form>
          {/* Footer */}
          <div className="flex justify-end p-[20px] gap-[10px] border-t w-full">
            <button
              onClick={() => setVisible(false)}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm border whitespace-nowrap text-black border-gray-200 rounded-lg !border-gray-200 hover:bg-gray-100 duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleExternalSubmit}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-[14px] font-[400] whitespace-nowrap text-white bg-blue-500 rounded-lg !border-gray-200 hover:bg-blue-700 duration-300"
            >
              Create
            </button>
          </div>
        </>
      </Dialog>
    </>
  );
};

export default HeaderProjectsDropdown;
