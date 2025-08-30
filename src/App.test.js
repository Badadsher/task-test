import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { beforeEach, it, expect } from "vitest";
import App from "./App";
beforeEach(() => {
    render(_jsx(App, {}));
    const input = screen.getByPlaceholderText("Название задачи");
    const addButton = screen.getByTestId("add-task-button");
    fireEvent.change(input, { target: { value: "Сделать что-то" } });
    fireEvent.click(addButton);
});
it("добавляет новую задачу через форму", () => {
    const allTasksList = screen.getByTestId("all-tasks-list");
    const task = within(allTasksList).queryByText((content) => content.includes("Сделать что-то"));
    expect(task).not.toBeNull();
});
it("выполняет задачу", () => {
    const allTasksList = screen.getByTestId("all-tasks-list");
    const taskItem = within(allTasksList)
        .getByText((content) => content.includes("Сделать что-то"))
        .closest("li");
    const completeButton = within(taskItem).getByTestId("complete-button");
    fireEvent.click(completeButton);
    const completedTasksList = screen.getByTestId("completed-tasks-list");
    const completedTask = within(completedTasksList).queryByText((content) => content.includes("Сделать что-то"));
    expect(completedTask).not.toBeNull();
});
it("удаляет задачу", () => {
    const allTasksList = screen.getByTestId("all-tasks-list");
    const taskItem = within(allTasksList)
        .getByText((content) => content.includes("Сделать что-то"))
        .closest("li");
    const deleteButton = within(taskItem).getByTestId("delete-button");
    fireEvent.click(deleteButton);
    const task = within(allTasksList).queryByText((content) => content.includes("Сделать что-то"));
    expect(task).toBeNull();
});
it("очищает выполненные задачи", () => {
    const allTasksList = screen.getByTestId("all-tasks-list");
    const taskItem = within(allTasksList)
        .getByText((content) => content.includes("Сделать что-то"))
        .closest("li");
    const completeButton = within(taskItem).getByTestId("complete-button");
    fireEvent.click(completeButton);
    const clearCompletedButton = screen.getByTestId("clear-completed-button");
    fireEvent.click(clearCompletedButton);
    const completedTasksList = screen.getByTestId("completed-tasks-list");
    const completedTask = within(completedTasksList).queryByText((content) => content.includes("Сделать что-то"));
    expect(completedTask).toBeNull();
});
