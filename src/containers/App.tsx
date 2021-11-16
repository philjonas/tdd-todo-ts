import { observer } from "mobx-react";
import React  from "react";
import { TaskAdder } from "../components/TaskAdder";
import { TaskItem } from "../components/TaskItem";
import {
  addItem,
  completeItemToggle,
  deleteItem,
  StoreProps,
} from "../state/Store";
import "./App.css";

export const App = ({ store }: { store: StoreProps }): JSX.Element => {
  const onDelete = (id: number) => deleteItem(store, id);
  const onComplete = (id: number) => completeItemToggle(store, id);
  const handleAdd = (value: string) => addItem(store, value);

  const TodosView = observer(() => (
    <div data-testid="app-todo-container">
      {store.data.map((item) => (
        <TaskItem
          key={item.id}
          {...item}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  ));
  const TaskView = observer(() => <TaskAdder addTask={handleAdd} />);

  return (
    <div className="App">
      <h1>Ye Olde ToDo App</h1>
      <TaskView />
      <TodosView />
    </div>
  );
};
