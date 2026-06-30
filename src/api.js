import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

export const getTodos   = ()           => api.get("/todos");
export const createTodo = (title)      => api.post("/todos", { title });
export const updateTodo = (id, data)   => api.put(`/todos/${id}`, data);
export const deleteTodo = (id)         => api.delete(`/todos/${id}`);
