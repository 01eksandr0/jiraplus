"use client";
import React, { useState, useEffect } from "react";
import Task from "./Task";
import { Statuses } from "../../types/task";
import { useParams } from "next/navigation";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import Loading from "../shared/Loading";
import { IProject } from "@/types/project";
import { Input } from "../UI/Input";

const TaskList: React.FC = () => {
  const token = useAuthStore((s) => s.token);
  const [projectData, setProjectData] = useState<IProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [openStatusForm, setOpenStatusForm] = useState<Statuses | "">("");
  const { id } = useParams();

  const fetchProjectData = async () => {
    if (!id) return;
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/api/projects/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setProjectData(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const setActiveFormCreateTask = (status: Statuses | "") => {
    setTaskTitle("");
    setOpenStatusForm(status);
  };

  const createTask = async (status: Statuses | "") => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `/api/tasks`,
        { project: id, status, title: taskTitle },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setTaskTitle("");
      setActiveFormCreateTask("");
      await fetchProjectData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const updateTaskStatus = async (taskId: string, newStatus: Statuses) => {
    try {
      await axios.put(
        process.env.NEXT_PUBLIC_API_URL + `/api/tasks/${taskId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      await fetchProjectData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = async (e: React.DragEvent, newStatus: Statuses) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      await updateTaskStatus(taskId, newStatus);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProjectData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  const statuses: Array<Statuses> = ["todo", "inprogress", "qa", "done"];

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl">{projectData?.name}</h2>
      <div className="task-board flex gap-4 ">
        {statuses.map((status) => (
          <div
            key={status}
            className="column bg-emerald-500 p-3 rounded w-64"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h3 className="text-xl font-bold text-white mb-2">
              {status.toUpperCase()}
            </h3>
            {!!projectData?.tasks?.length &&
              projectData.tasks
                .filter((task) => task?.status === status)
                .map((task) => (
                  <div
                    key={task._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task._id)}
                  >
                    <Task task={task} />
                  </div>
                ))}
            {openStatusForm === status ? (
              <div className="flex flex-col gap-1">
                <Input
                  placeholder="Title"
                  type="text"
                  autoFocus
                  value={taskTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTaskTitle(e.target.value)
                  }
                />
                <button
                  onClick={() => createTask(status)}
                  disabled={!taskTitle?.trim()}
                  className="w-full h-[40px] rounded-lg bg-white hover:bg-gray-100 duration-300 disabled:text-gray-300 cursor-not-allowed"
                >
                  Create card
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveFormCreateTask(status)}
                className="w-full h-[40px] rounded-lg bg-white hover:bg-gray-100 duration-300"
              >
                Add card +
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
