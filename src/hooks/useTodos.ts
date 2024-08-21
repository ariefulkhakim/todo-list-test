import { useCallback, useState } from "react";
import { useTodoStore } from "@/state/todoStore";
import { Todo } from "@/types/todo.types";

export const useTodos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "complete" | "incomplete" | string
  >("all");

  const { todos, addTodo, updateTodo, removeTodo, updateTodoStatus } =
    useTodoStore();

  const add = useCallback(
    (todo: Omit<Todo, "id">) => {
      addTodo(todo);
    },
    [addTodo]
  );

  const update = useCallback(
    (todo: Todo) => {
      updateTodo(todo);
    },
    [updateTodo]
  );

  return {
    todos,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    addTodo: add,
    updateTodo: update,
    removeTodo,
    updateTodoStatus,
  };
};
