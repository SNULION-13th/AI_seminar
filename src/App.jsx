
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as todoApi from "./services/todoApi";

function App() {
  const queryClient = useQueryClient();

  // --- Server State (TanStack Query) ---
  const { data: serverTodos, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: todoApi.getTodos,
  });

  // --- Client State ---
  const [displayedTodos, setDisplayedTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mit, setMit] = useState(() => {
    const savedMit = localStorage.getItem("mit");
    return savedMit ? JSON.parse(savedMit) : null;
  });

  // Sync server data with local display state for DnD
  useEffect(() => {
    if (serverTodos) {
      setDisplayedTodos(serverTodos);
    }
  }, [serverTodos]);

  // Persist MIT to localStorage
  useEffect(() => {
    localStorage.setItem("mit", JSON.stringify(mit));
  }, [mit]);

  // --- Mutations ---
  const addTodoMutation = useMutation({
    mutationFn: todoApi.addTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const updateTodoMutation = useMutation({
    mutationFn: todoApi.updateTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const deleteTodoMutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });


  // --- Event Handlers ---
  const handleAddTodo = () => {
    if (todoInput.trim() === "") return;
    addTodoMutation.mutate(todoInput);
    setTodoInput("");
  };

  const handleToggleTodo = (id) => {
    const todo = displayedTodos.find(t => t.id === id);
    if (todo) {
      updateTodoMutation.mutate({ id, is_completed: !todo.is_completed });
    }
  };

  const handleDeleteTodo = (id) => {
    deleteTodoMutation.mutate(id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setDisplayedTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const setAsMit = (id) => {
    if (mit === id) setMit(null); else setMit(id);
  }

  const clearCompletedTodos = () => {
    displayedTodos.forEach(todo => {
      if (todo.is_completed) {
        deleteTodoMutation.mutate(todo.id);
      }
    });
  };

  // --- Derived State & Filtering ---
  const getFilteredTodos = () => {
    // Date filtering
    const dateFilteredTodos = displayedTodos.filter(todo => 
      new Date(todo.created_at).toDateString() === selectedDate.toDateString()
    );

    const sortedTodos = [...dateFilteredTodos].sort((a, b) => {
      if (a.id === mit) return -1;
      if (b.id === mit) return 1;
      return 0;
    });

    switch (filter) {
      case "active":
        return sortedTodos.filter((todo) => !todo.is_completed);
      case "completed":
        return sortedTodos.filter((todo) => todo.is_completed);
      default:
        return sortedTodos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const allCompleted = !isLoading && filteredTodos.length > 0 && filteredTodos.every(todo => todo.is_completed);
  const progress = filteredTodos.length > 0 ? (filteredTodos.filter(t => t.is_completed).length / filteredTodos.length) * 100 : 0;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates, })
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[700px] border border-white/30">
        <Header 
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <ProgressBar progress={progress} />
        <TodoInput todo={todoInput} setTodo={setTodoInput} addTodo={handleAddTodo} />
        <div className="flex-grow overflow-y-auto">
          {isLoading && <div className="p-4 text-center">Loading...</div>}
          {isError && <div className="p-4 text-center text-red-500">Error fetching data.</div>}
          {!isLoading && !isError && (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              {allCompleted ? (
                <Celebration clearCompleted={clearCompletedTodos} />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  toggleTodo={handleToggleTodo}
                  deleteTodo={handleDeleteTodo}
                  mit={mit}
                  setAsMit={setAsMit}
                />
              )}
            </DndContext>
          )}
        </div>
        <Footer todos={filteredTodos} filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
}

export default App;
