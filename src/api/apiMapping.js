import axios from 'axios';

const url = "https://todo-list-mern-stack-app.herokuapp.com/todos";

export const readTodos = () => axios.get(url);
export const createTodo = newTodo => axios.post(url, newTodo);
export const updateTodo = (id, updateTodo) => axios.patch(`${url}/${id}`, updateTodo);
export const deleteTodo = (id) => axios.delete(`${url}/${id}`);
