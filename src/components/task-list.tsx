"use client";

import React, { MouseEventHandler, useEffect } from "react";
import { TaskItem } from "./task-item";
import styles from "./task-list.module.css";

export type Task = {
  id: string;
  title: string;
  state: "PINNED" | "COMPLETED" | "ACTIVE";
};

export function TaskList({ tasks }: { tasks: Task[] }) {
  const [task, setTask] = React.useState(tasks);
  const [title, setTitle] = React.useState("");

  const deleteTask = (id: string) => {
    const deleteTask = [...task];
    deleteTask.splice(deleteTask.findIndex(task => task.id === id), 1);
    setTask(deleteTask);
  }

  const changeState = (id: string, state: "PINNED" | "COMPLETED" | "ACTIVE") => {
    const changeState = [...task];
    changeState.find(task => task.id === id)!.state = state;
    setTask(changeState);
  }

  const addTask = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const id = (task.length + 1).toString();
    const newTask: Task = {id: id, title: title, state: "ACTIVE"}; 
    setTask([...task, newTask]);
    setTitle("");
  }

  const activeTasks = task.filter(task => task.state === "ACTIVE").length;

  return (
    <>
      <div>
        <section className={styles.counter}>
          <div className={styles.taskLabel}>{activeTasks} tasks</div>
        </section>
        <section className={styles.section}>
          {task.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={deleteTask} onStateChange={changeState}/>
          ))}
        </section>
      </div>
      <section className={styles.inputContainer}>
        <input
          type="text"
          placeholder="What needs to be done?"
          className={styles.taskInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className={styles.taskButton} onClick={addTask}>Add Task</button>
      </section>
    </>
  );
}
