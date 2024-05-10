import type { Task } from "./task-list";

import styles from "./task-item.module.css";
import React from "react";

export function TaskItem({ task, onDelete, onStateChange }: 
  { task: Task, onDelete: (id: string) => void, 
  onStateChange: (id: string, state: "PINNED" | "COMPLETED" | "ACTIVE") => void}){

  const [taskState, changeState] = React.useState(task.state);

  const titleClass = taskState === "COMPLETED" ? styles.titleCompleted: styles.title

  const handleCheckboxChange = (e: { target: { checked: any; }; }) => {
    changeState(taskState === "COMPLETED" ? "ACTIVE" : "COMPLETED");
    onStateChange(task.id, taskState === "COMPLETED" ? "ACTIVE" : "COMPLETED");
  }

  return (
    <div className={styles.container}>
      <div className={styles.checkbox}>
        <div className={styles.round}>
          <input
            type="checkbox"
            id={`task-${task.id}`}
            data-testid={`task-${task.id}`}
            checked={taskState === "COMPLETED"}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`task-${task.id}`}></label>
        </div>
      </div>
      <span className={titleClass}>{task.title}</span>
      <div className={styles.actions}>
        <button
          data-testid={`delete-${task.id}`}
          className={styles.deleteButton}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
