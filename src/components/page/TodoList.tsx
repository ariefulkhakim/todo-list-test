import { useTodos } from "@/hooks/useTodos";
import TodoItem from "./TodoItem";
import Modal from "@/components/ui/modal";
import { TodoForm } from "./TodoForm";
import { useModal } from "@/hooks/useModal";
import ThemeToggle from "../common/ThemeToggle";
import SearchIcon from "../ui/icons/SearchIcon";
import PlusIcon from "../ui/icons/PlusIcon";
import NotFound from "../common/NotFound";
import SelectCustom from "../ui/select";

export const TodoList = () => {
  const { todos, searchQuery, setSearchQuery, filterStatus, setFilterStatus } =
    useTodos();

  const { modalState, openModal, closeModal } = useModal();

  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterStatus === "all" || todo.status === filterStatus)
  );

  return (
    <div className="p-0 sm:p-4 relative">
      <header className="flex mb-4 gap-2 flex-wrap sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-2">
          <div className="relative w-full flex items-center">
            <SearchIcon
              color="#6C63FF"
              className="absolute w-5 h-5 z-20 right-4 top-[11px] sm:top-[13px] text-primary-foreground search-custom-icon"
            />
            <input
              type="text"
              placeholder="Search Todo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 px-4 rounded w-full"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <SelectCustom
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <ThemeToggle />
        </div>
      </header>
      {filteredTodos.length > 0 ? (
        <ul>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} openModal={openModal} />
          ))}
        </ul>
      ) : (
        <NotFound />
      )}
      <button
        onClick={() => openModal({ type: "add" })}
        className="fixed bottom-4 sm:bottom-8 right-5 md:right-10 lg:right-36 xl:right-[365px] mx-auto !rounded-full shadow-lg"
      >
        <PlusIcon color="#F7F7F7" />
      </button>
      {modalState.isOpen && (
        <Modal
          title={modalState.type === "add" ? "Tambah Todo" : "Update Todo"}
          isOpen={modalState.isOpen}
          onClose={closeModal}
        >
          <TodoForm
            initialData={modalState.type === "edit" ? modalState.data : null}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};
