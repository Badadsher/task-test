import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
function App() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const addTask = (e) => {
        e.preventDefault();
        if (!inputValue.trim())
            return;
        const newTask = { id: Date.now(), title: inputValue };
        setTasks([...tasks, newTask]);
        setInputValue("");
    };
    const completeTask = (id) => {
        const taskToComplete = tasks.find((t) => t.id === id);
        if (!taskToComplete)
            return;
        setTasks(tasks.filter((t) => t.id !== id));
        setCompletedTasks([...completedTasks, taskToComplete]);
    };
    const deleteTask = (id) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };
    const clearCompleted = () => {
        setCompletedTasks([]);
    };
    return (_jsxs("div", { className: "app", children: [_jsxs("div", { className: "task-container", children: [_jsx("h1", { children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u0430\u0441\u043A\u0443" }), _jsxs("form", { className: "task-form", onSubmit: addTask, children: [_jsx("input", { placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438", value: inputValue, onChange: (e) => setInputValue(e.target.value), required: true }), _jsx("button", { type: "submit", "data-testid": "add-task-button", children: "\u0414\u041E\u0411\u0410\u0412\u0418\u0422\u042C" })] })] }), _jsxs("div", { className: "task-container", children: [_jsx("h2", { children: "\u0412\u0441\u0435 \u0442\u0430\u0441\u043A\u0438" }), _jsx("ul", { className: "task-list", "data-testid": "all-tasks-list", children: tasks.map((task) => (_jsxs("li", { className: "task-item", children: [_jsx("div", { className: "task-info", children: task.title }), _jsxs("div", { className: "task-buttons", children: [_jsx("button", { className: "complete-button", "data-testid": "complete-button", onClick: () => completeTask(task.id), children: "\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C" }), _jsx("button", { className: "delete-button", "data-testid": "delete-button", onClick: () => deleteTask(task.id), children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" })] })] }, task.id))) })] }), _jsxs("div", { className: "completed-task-container", children: [_jsx("h2", { children: "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u0435 \u0442\u0430\u0441\u043A\u0438" }), _jsx("ul", { className: "completed-task-list", "data-testid": "completed-tasks-list", children: completedTasks.map((task) => (_jsx("li", { className: "task-item", children: _jsx("div", { children: task.title }) }, task.id))) }), completedTasks.length > 0 && (_jsx("button", { className: "delete-button", "data-testid": "clear-completed-button", onClick: clearCompleted, children: "\u041E\u0427\u0418\u0421\u0422\u0418\u0422\u042C \u0412\u042B\u041F\u041E\u041B\u041D\u0415\u041D\u041D\u042B\u0415" }))] })] }));
}
export default App;
