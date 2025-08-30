import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask: Task = { id: Date.now(), title: inputValue };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const completeTask = (id: number) => {
    const taskToComplete = tasks.find((t) => t.id === id);
    if (!taskToComplete) return;
    setTasks(tasks.filter((t) => t.id !== id));
    setCompletedTasks([...completedTasks, taskToComplete]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setCompletedTasks([]);
  };

  return (
    <div className="app">
      {/* Форма добавления задачи */}
      <div className="task-container">
        <h1>Добавить таску</h1>
        <form className="task-form" onSubmit={addTask}>
          <input
            placeholder="Название задачи"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <button type="submit" data-testid="add-task-button">
            ДОБАВИТЬ
          </button>
        </form>
      </div>

      {/* Список всех задач */}
      <div className="task-container">
        <h2>Все таски</h2>
        <ul className="task-list" data-testid="all-tasks-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-info">{task.title}</div>
              <div className="task-buttons">
                <button
                  className="complete-button"
                  data-testid="complete-button"
                  onClick={() => completeTask(task.id)}
                >
                  Выполнить
                </button>
                <button
                  className="delete-button"
                  data-testid="delete-button"
                  onClick={() => deleteTask(task.id)}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Список выполненных задач */}
      <div className="completed-task-container">
        <h2>Выполненные таски</h2>
        <ul className="completed-task-list" data-testid="completed-tasks-list">
          {completedTasks.map((task) => (
            <li key={task.id} className="task-item">
              <div>{task.title}</div>
            </li>
          ))}
        </ul>
        {completedTasks.length > 0 && (
          <button
            className="delete-button"
            data-testid="clear-completed-button"
            onClick={clearCompleted}
          >
            ОЧИСТИТЬ ВЫПОЛНЕННЫЕ
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
