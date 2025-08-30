import { useState } from "react";
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface OpenSection {
  taskList: boolean;
  tasks: boolean;
  tasksFull: boolean;
  completedTasks: boolean;
}

interface TaskFormProps {
  addTask: (task: Omit<Task, "id" | "completed">) => void;
}

interface TaskListProps {
  activeTasks: Task[];
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
}

interface CompletedTaskListProps {
  completedTasks: Task[];
  deleteTask: (id: number) => void;
}

interface TaskItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  completeTask?: (id: number) => void;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [openSection, setOpenSection] = useState<OpenSection>({
    taskList: true,
    tasks: true,
    tasksFull: true,
    completedTasks: true,
  });

  function toggleSection(section: keyof OpenSection) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function addTask(task: Omit<Task, "id" | "completed">) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function completeTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  }
  function clearCompleted() {
    setTasks(tasks.filter((task) => !task.completed));
  }

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="app">
      <div className="task-container">
        <h1>Добавить таску</h1>
        <button
          className={`close-button ${openSection.taskList ? "open" : ""}`}
          onClick={() => toggleSection("taskList")}
        >
          +
        </button>
        {openSection.taskList && <TaskForm addTask={addTask} />}
      </div>
      <div className="task-container">
        <h2>Все таски</h2>
        <button
          className={`close-button ${openSection.tasksFull ? "open" : ""}`}
          onClick={() => toggleSection("tasksFull")}
        >
          +
        </button>

        {openSection.tasksFull && (
          <>
            <TaskList
              completeTask={completeTask}
              deleteTask={deleteTask}
              activeTasks={activeTasks}
            />
            <CompletedTaskList
              deleteTask={deleteTask}
              completedTasks={completedTasks}
            />
          </>
        )}
      </div>
      <div className="task-container">
        <h2>Активные таски</h2>
        <button
          className={`close-button ${openSection.tasks ? "open" : ""}`}
          onClick={() => toggleSection("tasks")}
        >
          +
        </button>
        <a>Количество оставшихся тасок: {activeTasks.length}</a>
        {openSection.tasks && (
          <TaskList
            completeTask={completeTask}
            deleteTask={deleteTask}
            activeTasks={activeTasks}
          />
        )}
      </div>
      <div className="completed-task-container">
        <h2>Выполненные таски</h2>
        <button
          className={`close-button ${openSection.completedTasks ? "open" : ""}`}
          onClick={() => toggleSection("completedTasks")}
        >
          +
        </button>

        {openSection.completedTasks && (
          <CompletedTaskList
            deleteTask={deleteTask}
            completedTasks={completedTasks}
          />
        )}
        <button className="delete-button" onClick={() => clearCompleted()}>
          ОЧИСТИТЬ ВЫПОЛНЕННЫЕ
        </button>
      </div>
    </div>
  );
}

export function TaskForm({ addTask }: TaskFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim()) {
      addTask({ title });
      setTitle("");
    }
  }

  return (
    <form action="" className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Название задачи"
        required
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">ДОБАВИТЬ</button>
    </form>
  );
}

export function TaskList({
  activeTasks,
  deleteTask,
  completeTask,
}: TaskListProps) {
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem
          completeTask={completeTask}
          deleteTask={deleteTask}
          task={task}
          key={task.id}
        />
      ))}
    </ul>
  );
}

export function CompletedTaskList({
  completedTasks,
  deleteTask,
}: CompletedTaskListProps) {
  return (
    <ul className="completed-task-list">
      {completedTasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

export function TaskItem({ task, deleteTask, completeTask }: TaskItemProps) {
  const { title, id, completed } = task;

  return (
    <li className={`task-item`}>
      <div className="task-info">
        <div>{title}</div>
      </div>
      <div className="task-buttons">
        {!completed && completeTask && (
          <button className="complete-button" onClick={() => completeTask(id)}>
            Выполнить
          </button>
        )}
        <button className="delete-button" onClick={() => deleteTask(id)}>
          Удалить
        </button>
      </div>
    </li>
  );
}

export default App;
