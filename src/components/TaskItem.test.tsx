import { render } from "@testing-library/react";
import { TaskItem, TaskItemProps } from "./TaskItem";

const setup = (props: TaskItemProps) => {
  const utils = render(<TaskItem {...props} />);
  const input = utils.getByTestId("task-item-text");
  const completed = utils.getByTestId("task-item-completed") as HTMLInputElement;
  return {
    input,
    completed,
    ...utils,
  };
};

const props: TaskItemProps = {
  id: 1,
  value: "new task",
  isCompleted: false,
  onDelete: (id:number) => jest.fn(),
  onComplete: (id:number) => jest.fn(),
};

describe("TaskItem", () => {
  it("renders correctly", () => {
    const wrapper = <TaskItem {...props} />;
    expect(wrapper).toMatchSnapshot();
  });

  it("displays the value from props", () => {
    const { input } = setup(props);
    expect(input.innerHTML).toBe("new task");
  });

  it("should not be completed on creation", () => {
    const { completed } = setup(props);
    expect(completed.checked).toBe(false);
  });

  it("should be completed from props", () => {
    const { completed } = setup({...props, isCompleted: true});
    expect(completed.checked).toBe(true);
  });

});
