
import { useState, useEffect } from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import ProgressBar from "./components/features/todo/ProgressBar";
import TodoInput from "./components/features/todo/TodoInput";
import TodoList from "./components/features/todo/TodoList";
import Celebration from "./components/features/todo/Celebration";
import "./App.css";

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [todo, setTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [mit, setMit] = useState(() => {
    const savedMit = localStorage.getItem("mit");
    return savedMit ? JSON.parse(savedMit) : null;
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("mit", JSON.stringify(mit));
  }, [mit]);

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

  const setAsMit = (id) => {
    if (mit === id) {
      setMit(null);
    } else {
      setMit(id);
      const newTodos = [...todos];
      const mitTodoIndex = newTodos.findIndex(todo => todo.id === id);
      if (mitTodoIndex === -1) return;

      const [mitTodo] = newTodos.splice(mitTodoIndex, 1);
      newTodos.unshift(mitTodo);
      setTodos(newTodos);
    }
  }

  const addTodo = () => {
    if (todo.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const getFilteredTodos = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (a.id === mit) return -1;
      if (b.id === mit) return 1;
      return 0;
    });

    switch (filter) {
      case "active":
        return sortedTodos.filter((todo) => !todo.completed);
      case "completed":
        return sortedTodos.filter((todo) => todo.completed);
      default:
        return sortedTodos;
    }
  };

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);
  const progress = todos.length > 0 ? (todos.filter(t => t.completed).length / todos.length) * 100 : 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[700px] border border-white/30">
        <Header />
        <ProgressBar progress={progress} />
        <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} />
        <div className="flex-grow overflow-y-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            {allCompleted ? (
              <Celebration clearCompleted={clearCompletedTodos} />
            ) : (
              <TodoList
                todos={getFilteredTodos()}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                mit={mit}
                setAsMit={setAsMit}
              />
            )}
          </DndContext>
        </div>
        <Footer todos={todos} filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
}

export default App;
