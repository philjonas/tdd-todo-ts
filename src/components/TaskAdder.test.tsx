import { render, fireEvent } from "@testing-library/react";
import { TaskAdder, TaskAdderProps } from "./TaskAdder";

const setup = (props?: TaskAdderProps) => {
  const utils = render(<TaskAdder {...props} />);
  const input = utils.getByTestId("task-adder-text");
  const add = utils.getByTestId("task-adder-add");
  const clear = utils.getByTestId("task-adder-clear");
  return {
    input,
    add,
    clear,
    ...utils,
  };
};

describe("TaskAdder", () => {
  it("renders correctly", () => {
    const wrapper = <TaskAdder />;
    expect(wrapper).toMatchSnapshot();
  });

  it("has a placeholder", () => {
    const { input } = setup();
    expect(input.getAttribute("placeholder")).toBe("write your task here");
  });

  it("should update the value", () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: "123" } });
    expect(input.getAttribute("value")).toBe("123");
  });

  it("should clear the value", () => {
    const { input, clear } = setup();
    fireEvent.change(input, { target: { value: "123" } });
    expect(input.getAttribute("value")).toBe("123");
    fireEvent.click(clear);
    expect(input.getAttribute("value")).toBe("");
  });

  it("should fire add event when add button clicked", () => {
    const props: TaskAdderProps = { addTask: jest.fn() };
    const { add, input } = setup(props);
    fireEvent.change(input, { target: { value: "123" } });
    expect(input.getAttribute("value")).toBe("123");
    fireEvent.click(add);
    expect(props.addTask).toBeCalledTimes(1);
    expect(input.getAttribute("value")).toBe("");
  });
});
