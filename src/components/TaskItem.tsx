import React from "react";
import "./TaskItem.css";

export interface TaskItemProps {
  id: number;
  value: string;
  isCompleted: boolean;
  onDelete?: (id: number) => void;
  onComplete?: (id: number) => void;
}

export const TaskItem = ({
  id,
  value,
  isCompleted,
  onDelete,
  onComplete,
}: TaskItemProps): JSX.Element => {
  const textClass = isCompleted ? "task-item-text completed" : "task-item-text";
  return (
    <div className="task-item">
      <div data-testid="task-item-text" className={textClass}>
        {value}
      </div>
      <span
        onClick={() => onComplete?.(id)}
        data-testid="task-item-complete"
        className="task-item-complete"
      >
        <label>Completed:</label>
        <input
          data-testid="task-item-completed"
          type="checkbox"
          checked={isCompleted}
          readOnly
        />
      </span>
      <button
        data-testid="task-item-delete"
        onClick={() => onDelete?.(id)}
        className="task-item-delete"
      >
        Delete
      </button>
    </div>
  );
};
