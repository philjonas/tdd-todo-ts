import React, { ChangeEvent, useState } from "react";
import "./TaskAdder.css";

export interface TaskAdderProps {
  addTask?: (val: string) => void;
  initialValue?: string;
}

export const TaskAdder = ({
  addTask,
  initialValue = "",
}: TaskAdderProps): JSX.Element => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setValue(ev.currentTarget.value);
  };

  const clearText = () => setValue("");

  const handleAdd = () => {
    addTask?.(value);
    clearText();
  };

  return (
    <div className="task-adder">
      <div>
        Task:
        <input
          value={value}
          data-testid="task-adder-text"
          type="text"
          placeholder="write your task here"
          onChange={handleChange}
        />
      </div>
      <div>
        <button data-testid="task-adder-add" onClick={handleAdd}>
          Add Task
        </button>
        <button data-testid="task-adder-clear" onClick={clearText}>
          Clear Text
        </button>
      </div>
    </div>
  );
};
