import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./App.css";

function SortableTodoItem(props) {
  const {
    id,
    todo,
    filter,
    toggleCompletion,
    toggleFocus,
    handleDeleteTodo,
  } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id, disabled: filter !== 'all' });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const handleListeners = filter === 'all' ? listeners : {};

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...handleListeners}
      className={`flex items-center justify-between p-4 border-b dark:border-gray-700 ${
        todo.completed ? "text-gray-400 line-through" : "text-gray-800 dark:text-gray-200"
      } ${todo.isFocus ? "bg-yellow-100 dark:bg-yellow-800" : ""}`}
    >
      <div className="flex items-center">
        {filter === 'all' && <span className="pr-2 cursor-grab touch-none">::</span>}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleCompletion(todo.id)}
          className="mr-4 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <span>{todo.text}</span>
      </div>
      <div className="flex items-center">
        <button onClick={() => toggleFocus(todo.id)} className={`mr-2 p-1 rounded ${todo.isFocus ? 'bg-yellow-400' : 'bg-gray-200 dark:bg-gray-600'}`}>
          ⭐
        </button>
        <button onClick={() => handleDeleteTodo(todo.id)} className="text-red-500 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, isFocus: false }]);
    setNewTodo("");
  };

  const toggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleFocus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isFocus: !todo.isFocus } : { ...todo, isFocus: false }
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-xl p-4">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">ClearList</h1>
            <p className="text-gray-500 dark:text-gray-400">{dateString}</p>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>
        </header>

        <form onSubmit={handleAddTodo} className="flex mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="오늘 무엇을 할까요?"
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-3 rounded-r-lg hover:bg-indigo-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </form>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={todos.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              {filteredTodos.length === 0 ? (
                <p className="p-4 text-center text-gray-500 dark:text-gray-400">할 일이 없습니다.</p>
              ) : (
                <ul>
                  {filteredTodos.map((todo) => (
                    <SortableTodoItem
                      key={todo.id}
                      id={todo.id}
                      todo={todo}
                      filter={filter}
                      toggleCompletion={toggleCompletion}
                      toggleFocus={toggleFocus}
                      handleDeleteTodo={handleDeleteTodo}
                    />
                  ))}
                </ul>
              )}
            </div>
          </SortableContext>
        </DndContext>

        {todos.length > 0 && (
          <div className="flex justify-between items-center mt-6 text-gray-500 dark:text-gray-400">
            <span>{todos.filter(t => !t.completed).length} items left</span>
            <div>
              <button onClick={() => setFilter("all")} className={`mr-2 ${filter === "all" ? "font-bold text-indigo-600" : ""}`}>All</button>
              <button onClick={() => setFilter("active")} className={`mr-2 ${filter === "active" ? "font-bold text-indigo-600" : ""}`}>Active</button>
              <button onClick={() => setFilter("completed")} className={`${filter === "completed" ? "font-bold text-indigo-600" : ""}`}>Completed</button>
            </div>
            <button onClick={handleClearCompleted} className="hover:text-red-500">Clear Completed</button>
          </div>
        )}
        
        {todos.length > 0 && todos.every(t => t.completed) && (
          <div className="mt-6 text-center text-green-500">
            <p className="text-lg">모든 작업을 완료했습니다! 멋진 하루 보내세요! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

