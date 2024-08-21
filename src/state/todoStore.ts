import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Todo } from "@/types/todo.types";

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, "id">) => void;
  updateTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  searchTodos: (term: string) => Todo[];
  filterTodosByStatus: (
    todos: Todo[],
    status: "all" | "complete" | "incomplete"
  ) => Todo[];
  updateTodoStatus: (id: string, status: "complete" | "incomplete") => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (newTodo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { ...newTodo, id: Date.now().toString(), status: "incomplete" },
          ],
        })),
      updateTodo: (updatedTodo) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          ),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      searchTodos: (term) =>
        get().todos.filter((todo) =>
          todo.title.toLowerCase().includes(term.toLowerCase())
        ),
      filterTodosByStatus: (todos, status) => {
        if (status === "all") return todos;
        return todos.filter((todo) => todo.status === status);
      },
      updateTodoStatus: (id, status) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, status } : todo
          ),
        })),
    }),
    { name: "todo-storage", storage: createJSONStorage(() => localStorage) }
  )
);
