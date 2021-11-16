import { observable, action } from "mobx";
import { TaskItemProps } from "../components/TaskItem";

export interface StoreProps {
  itemId: number;
  data: TaskItemProps[];
}

export const initialStore: StoreProps = {
  itemId: 3,
  data: [
    { id: 1, value: "Learn TDD", isCompleted: false },
    { id: 2, value: "Write TDD", isCompleted: false },
    { id: 3, value: "Peace of mind", isCompleted: false },
  ],
};

export const store: StoreProps = observable({ ...initialStore });

export const addItem = action((state: StoreProps, value: string): void => {
  if (!value) {
    return;
  }
  const newId = state.itemId + 1;
  state.itemId = newId;
  state.data = [
    {
      id: newId,
      value,
      isCompleted: false,
    },
    ...state.data,
  ];
});

export const completeItemToggle = action(
  (state: StoreProps, id: number): void => {
    const dataClone = state.data.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    state.data = [...dataClone];
  }
);

export const deleteItem = action((state: StoreProps, id: number): void => {
  const dataClone = state.data.filter((item) => item.id !== id);
  state.data = [...dataClone];
});
