import { ITask } from "../../types/task";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className="task-card bg-white p-3 my-2 rounded ">
      <p className="text-sm">{task.title}</p>
    </div>
  );
};

export default Task;
