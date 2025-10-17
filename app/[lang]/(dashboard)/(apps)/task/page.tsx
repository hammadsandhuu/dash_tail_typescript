import { getTasks } from "@/config/project-config";
import ViewTask from "./view-task";

const TaskPage = async () => {
  let tasks = [];

  try {
    tasks = await getTasks();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // 🟡 If no data → show Coming Soon
  const noData = !tasks || tasks.length === 0;

  if (noData) {
    return (
      <div className="flex justify-center items-center h-64 text-2xl font-semibold text-gray-500">
        Coming Soon
      </div>
    );
  }

  return <ViewTask tasks={tasks} />;
};

export default TaskPage;
