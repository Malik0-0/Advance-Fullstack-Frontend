import React, { createContext, useReducer, useContext } from "react";
import type { Todo, TodosState, TodosAction } from "./types";
import * as api from "../../lib/mockApi";

type ContextValue = {
  state: TodosState;
  createTodo: (title: string) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
};

const initialState: TodosState = {
  todos: [
    // seed with sample
    { id: "1", title: "Learn React Context", completed: false },
    { id: "2", title: "Use react-hook-form", completed: false },
  ],
  loading: {
    creating: false,
    updating: {},
    deleting: {},
  },
  error: null,
};

function reducer(state: TodosState, action: TodosAction): TodosState {
  console.log("[TODOS REDUCER] action:", action.type, "payload:", (action as any).payload ?? (action as any));
  switch (action.type) {
    case "INIT":
      return { ...state, todos: action.payload };
    case "CREATE_OPTIMISTIC":
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        loading: { ...state.loading, creating: true },
      };
    case "CREATE_CONFIRMED": {
      const { tempId } = action;
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === tempId ? action.payload : t)),
        loading: { ...state.loading, creating: false },
      };
    }
    case "CREATE_ROLLBACK":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.tempId),
        loading: { ...state.loading, creating: false },
        error: action.error ?? "Failed to create todo",
      };
    case "UPDATE_OPTIMISTIC":
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === action.payload.id ? action.payload : t)),
        loading: {
          ...state.loading,
          updating: { ...state.loading.updating, [action.payload.id]: true },
        },
      };
    case "UPDATE_CONFIRMED":
      return {
        ...state,
        loading: {
          ...state.loading,
          updating: { ...state.loading.updating, [action.payload.id]: false },
        },
      };
    case "UPDATE_ROLLBACK":
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === action.id ? action.prev : t)),
        loading: {
          ...state.loading,
          updating: { ...state.loading.updating, [action.id]: false },
        },
        error: action.error ?? "Failed to update todo",
      };
    case "DELETE_OPTIMISTIC": {
      const { id } = action;
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== id),
        loading: { ...state.loading, deleting: { ...state.loading.deleting, [id]: true } },
      };
    }
    case "DELETE_CONFIRMED": {
      const { id } = action;
      const deleting = { ...state.loading.deleting };
      delete deleting[id];
      return {
        ...state,
        loading: { ...state.loading, deleting },
      };
    }
    case "DELETE_ROLLBACK": {
      const prev = action.prev;
      const deleting = { ...state.loading.deleting };
      delete deleting[prev.id];
      return {
        ...state,
        todos: [prev, ...state.todos],
        loading: { ...state.loading, deleting },
        error: action.error ?? "Failed to delete todo",
      };
    }
    case "SET_ERROR":
      return { ...state, error: action.error ?? null };
    default:
      return state;
  }
}

const TodosContext = createContext<ContextValue | undefined>(undefined);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Create (optimistic)
  const createTodo = async (title: string) => {
    const tempId = `tmp-${Date.now()}`;
    const tempTodo: Todo = { id: tempId, title, completed: false };
    dispatch({ type: "CREATE_OPTIMISTIC", payload: tempTodo });

    try {
      const saved = await api.createTodoApi<Todo>({ title, completed: false } as any);
      // server returns id; merge
      dispatch({ type: "CREATE_CONFIRMED", tempId, payload: { ...saved } as Todo });
    } catch (err: any) {
      dispatch({ type: "CREATE_ROLLBACK", tempId, error: err?.message });
    }
  };

  // Update (optimistic)
  const updateTodo = async (todo: Todo) => {
    // keep previous snapshot for rollback
    const prev = state.todos.find((t) => t.id === todo.id) as Todo;
    dispatch({ type: "UPDATE_OPTIMISTIC", payload: todo });

    try {
      await api.updateTodoApi(todo);
      dispatch({ type: "UPDATE_CONFIRMED", payload: todo });
    } catch (err: any) {
      dispatch({ type: "UPDATE_ROLLBACK", id: todo.id, prev, error: err?.message });
    }
  };

  // Delete (optimistic)
  const deleteTodo = async (id: string) => {
    const prev = state.todos.find((t) => t.id === id) as Todo;
    dispatch({ type: "DELETE_OPTIMISTIC", id, prev });

    try {
      await api.deleteTodoApi(id);
      dispatch({ type: "DELETE_CONFIRMED", id });
    } catch (err: any) {
      dispatch({ type: "DELETE_ROLLBACK", prev, error: err?.message });
    }
  };

  return (
    <TodosContext.Provider value={{ state, createTodo, updateTodo, deleteTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used inside TodosProvider");
  return ctx;
}