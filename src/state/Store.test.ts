import {
  addItem,
  completeItemToggle,
  deleteItem,
  initialStore,
  StoreProps,
} from "../state/Store";

describe("App", () => {
  let store: StoreProps;
  beforeEach(() => {
    store = { ...initialStore };
  });

  it("adds a new task", () => {
    expect(store.data.length).toBe(3);
    addItem(store, "123");
    expect(store.data.length).toBe(4);
  });

  it("gets deleted on click", () => {
    expect(store.data.length).toBe(3);
    deleteItem(store, 1);
    expect(store.data.length).toBe(2);
  });

  it("gets completed on click", () => {
    completeItemToggle(store, 1);
    expect(store.data[0].isCompleted).toBe(true);
    completeItemToggle(store, 1);
    expect(store.data[0].isCompleted).toBe(false);
  });
});
