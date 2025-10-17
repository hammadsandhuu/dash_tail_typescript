import {
  getBoards,
  getTasks,
  getSubtasks,
  getComments,
} from "@/config/project-config";
import KanbanBreadCrumbs from "./bread-crumbs";
import TaskBoard from "@/components/task-board";

const Kanban = async () => {
  let boards = [];
  let tasks = [];
  let subTasks = [];
  let comments = [];

  try {
    boards = await getBoards();
    tasks = await getTasks();
    subTasks = await getSubtasks();
    comments = await getComments();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  const noData =
    !boards?.length &&
    !tasks?.length &&
    !subTasks?.length &&
    !comments?.length;

  if (noData) {
    return (
      <div className="flex justify-center items-center h-64 text-2xl font-semibold text-gray-500">
        Coming Soon
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap mb-7">
        <div className="text-xl font-medium text-default-900 flex-1">
          Kanban Board
        </div>
        <div className="flex-none">
          <KanbanBreadCrumbs />
        </div>
      </div>
      <TaskBoard
        boards={boards}
        tasks={tasks}
        subTasks={subTasks}
        comments={comments}
      />
    </>
  );
};

export default Kanban;
