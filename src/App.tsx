import { TodoList } from "./components/page/TodoList";

function App() {
  return (
    <>
      <div className="container">
        <div className="w-full sm:max-w-[750px] mx-auto pt-10">
          <h1 className="text-[26px] leading-[38px] font-medium uppercase text-center">
            Todo List
          </h1>
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
