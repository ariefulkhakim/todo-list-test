import { Todo } from "@/types/todo.types";
import { useState } from "react";

interface ModalState {
  isOpen: boolean;
  type: string | null;
  data?: Todo | null;
}

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null,
    data: null,
  });

  const openModal = ({ type, data }: { type: string; data?: Todo | null }) => {
    setModalState({
      isOpen: true,
      type,
      data,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      data: null,
    });
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
};
