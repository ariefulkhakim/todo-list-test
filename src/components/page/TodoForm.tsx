import React, { useState } from "react";
import { Todo } from "@/types/todo.types";
import { useTodos } from "@/hooks/useTodos";

interface TodoFormProps {
  initialData?: Todo | null;
  onClose: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ initialData, onClose }) => {
  const { addTodo, updateTodo } = useTodos();

  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [description, setDescription] = useState<string>(
    initialData?.description || ""
  );
  const [datetime, setDatetime] = useState<string>(initialData?.datetime || "");

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    datetime: "",
  });

  const validateForm = () => {
    const newErrors = {
      title: "",
      description: "",
      datetime: "",
    };
    let valid = true;

    if (!title) {
      newErrors.title = "Title is required";
      valid = false;
    }
    if (!description) {
      newErrors.description = "Description is required";
      valid = false;
    }
    if (!datetime) {
      newErrors.datetime = "Datetime is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const todoData = {
      id: initialData?.id || "",
      title,
      description,
      datetime,
    };

    if (initialData) {
      updateTodo(todoData as Todo);
    } else {
      addTodo({
        title,
        description,
        datetime,
      });
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 py-0 space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="datetime"
          className="block text-sm font-medium text-gray-700"
        >
          Date & Time
        </label>
        <input
          id="datetime"
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          className="placeholder:text-white"
        />
        {errors.datetime && (
          <p className="text-red-500 text-xs mt-1">{errors.datetime}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-5">
        <button
          type="button"
          onClick={onClose}
          className="bg-transparent !border-primary !py-[10px] !px-[22px] text-primary"
        >
          Cancel
        </button>
        <button className="!px-[22px]" type="submit">
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};
