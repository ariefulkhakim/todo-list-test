import { FC, useState } from "react";
import { Todo } from "@/types/todo.types";
import { useTodos } from "@/hooks/useTodos";
import CheckIcon from "../ui/icons/CheckIcon";
import CloseIcon from "../ui/icons/CloseIcon";
import PencilIcon from "../ui/icons/PencilIcon";
import TrashIcon from "../ui/icons/TrashIcon";

interface TodoItemProps {
  todo: Todo;
  openModal: ({ type, data }: { type: string; data?: Todo | null }) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, openModal }) => {
  const { updateTodoStatus, removeTodo } = useTodos();
  const [toggleDelete, setToggleDelete] = useState(false);

  const handleStatusChange = () => {
    const newStatus = todo.status === "complete" ? "incomplete" : "complete";
    updateTodoStatus(todo.id, newStatus);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-primary">
      <div className="flex items-center gap-3">
        <div className="w-[26px] h-[26px]">
          <input
            type="checkbox"
            checked={todo.status === "complete"}
            onChange={handleStatusChange}
            className="mr-2  w-[26px] h-[26px] !border-primary flex-1"
          />
        </div>
        <h3
          className={`text-[20px] leading-[26px] sm:leading-5 font-semibold text-todo-item ${
            todo.status === "complete"
              ? "line-through text-[#25252580]"
              : "no-underline"
          }`}
        >
          {todo.title}
        </h3>
      </div>
      {toggleDelete ? (
        <div className="flex items-center gap-3">
          <div
            onClick={() => {
              removeTodo(todo.id);
              setToggleDelete(false);
            }}
          >
            <CheckIcon color="#2563eb" width="18" height="18" />
          </div>
          <div onClick={() => setToggleDelete(false)}>
            <CloseIcon color="#E50000" width="18" height="13" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div
            onClick={() => {
              openModal({ type: "edit", data: todo });
            }}
          >
            <PencilIcon />
          </div>
          <div onClick={() => setToggleDelete(true)}>
            <TrashIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
