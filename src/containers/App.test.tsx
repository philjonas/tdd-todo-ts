import { render, fireEvent, getByTestId } from "@testing-library/react";
import { observable } from "mobx";
import { initialStore, store, StoreProps } from "../state/Store";
import { App } from "./App";

const setup = () => {
  const setupStore: StoreProps = observable({ ...initialStore });
  const utils = render(<App store={setupStore} />);
  const input = utils.getByTestId("task-adder-text");
  const add = utils.getByTestId("task-adder-add");
  const list = utils.getByTestId("app-todo-container");
  return {
    input,
    add,
    list,
    ...utils,
  };
};

describe("App", () => {
  it("renders correctly", () => {
    const wrapper = <App store={store} />;
    expect(wrapper).toMatchSnapshot();
  });

  it("adds a new task", () => {
    const { list, input, add } = setup();
    expect(list.children.length).toBe(3);
    fireEvent.change(input, { target: { value: "123" } });
    expect(input.getAttribute("value")).toBe("123");
    fireEvent.click(add);
    expect(list.children.length).toBe(4);
  });

  it("does not add a new task when the input is blank", () => {
    const { list, input, add } = setup();
    expect(list.children.length).toBe(3);
    fireEvent.change(input, { target: { value: "" } });
    expect(input.getAttribute("value")).toBe("");
    fireEvent.click(add);
    expect(list.children.length).toBe(3);
  });

  it("gets completed on click", () => {
    const { list } = setup();
    expect(list.children.length).toBe(3);
    const item = list.children.item(0);
    const completeBTN = getByTestId(item as HTMLElement, "task-item-completed");
    const txt = getByTestId(item as HTMLElement, "task-item-text");
    expect(txt.className).toBe("task-item-text");
    fireEvent.click(completeBTN);
    expect(txt.className).toBe("task-item-text completed");
  });

  it("gets deleted on click", () => {
    const { list } = setup();
    expect(list.children.length).toBe(3);
    const item = list.children.item(0);
    const deleteBTN = getByTestId(item as HTMLElement, "task-item-delete");
    fireEvent.click(deleteBTN);
    expect(list.children.length).toBe(2);
  });
});
