import { useState } from "react";
import SearchTask from "./Tasks/SearchTask";
import TaskAction from "./Tasks/TaskAction";
import TaskList from "./Tasks/TaskList";
import AddTaskModal from "./Tasks/AddTaskModal";
import NoTasks from "./Tasks/NoTasks";

export default function TaskBoard() {
  const defaultTasks = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFav: true,
  };

  const [tasks, setTasks] = useState([defaultTasks]);

  const [showAddmodal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowAddModal(false);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleClose() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  function handleDelete(taskId) {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskAfterDelete);
  }

  function handleDeleteAll() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFav(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFav = !newTasks[taskIndex].isFav;
    setTasks(newTasks);
  }

  function handleSearch(search) {
    console.log(search);

    const filtered = tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase())
  );
  setTasks([...filtered]);

  }

  return (
    <section className="mb-20" id="tasks">
      {showAddmodal && (
        <AddTaskModal
          onSave={handleAddTask}
          onCloseClick={handleClose}
          taskToUpdate={taskToUpdate}
        />
      )}

      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask
          onSearch={handleSearch}
          />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddClick={() => setShowAddModal(true)}
            onDeleteAll={handleDeleteAll}
          />

          {
          tasks.length > 0 ?
            (<TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDelete}
            onFav={handleFav}
          />) : (<NoTasks></NoTasks>)
          }
        </div>
      </div>
    </section>
  );
}
