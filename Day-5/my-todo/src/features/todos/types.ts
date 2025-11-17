export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodosState = {
  todos: Todo[];
  loading: {
    creating: boolean;
    updating: Record<string, boolean>;
    deleting: Record<string, boolean>;
  };
  // simple error message
  error?: string | null;
};

export type TodosAction =
  | { type: "INIT"; payload: Todo[] }
  | { type: "CREATE_OPTIMISTIC"; payload: Todo }
  | { type: "CREATE_CONFIRMED"; tempId: string; payload: Todo }
  | { type: "CREATE_ROLLBACK"; tempId: string; error?: string }
  | { type: "UPDATE_OPTIMISTIC"; payload: Todo }
  | { type: "UPDATE_CONFIRMED"; payload: Todo }
  | { type: "UPDATE_ROLLBACK"; id: string; prev: Todo; error?: string }
  | { type: "DELETE_OPTIMISTIC"; id: string; prev: Todo }
  | { type: "DELETE_CONFIRMED"; id: string }
  | { type: "DELETE_ROLLBACK"; prev: Todo; error?: string }
  | { type: "SET_ERROR"; error?: string | null };
