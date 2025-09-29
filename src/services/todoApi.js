const API_BASE_URL = "http://localhost:3000/api";

// GET /api/todos
export const getTodos = async () => {
  const response = await fetch(`${API_BASE_URL}/todos`);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

// POST /api/todos
export const addTodo = async (task) => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });
  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
  return response.json();
};

// PUT /api/todos/:id
export const updateTodo = async ({ id, is_completed }) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ is_completed }),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  return response.json();
};

// DELETE /api/todos/:id
export const deleteTodo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (response.status !== 204) { // 204 No Content
    throw new Error("Failed to delete todo");
  }
  return { id };
};
