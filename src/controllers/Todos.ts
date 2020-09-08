import { RequestHandler } from "express";
import TodoInterface from "../repositories/todos/TodoInterface";
import TodoRepository from "../repositories/todos/TodoMemRepository";

export const index: RequestHandler = (req, res, next) => {
  console.log("Get index of todos");

  const todoRepo: TodoInterface = TodoRepository.getInstance();

  res.json({ data: todoRepo.index() });
};

export const create: RequestHandler = (req, res, next) => {
  console.log("Creating new todo");

  const name = (req.body as { name: string; description: string }).name;
  const description = (req.body as { text: string; description: string }).description;

  const todoRepo: TodoInterface = TodoRepository.getInstance();
  const newTodo = todoRepo.create(name, description);

  res.status(201).json({ data: newTodo });
};

export const read: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  console.log(`Fetching todo with id ${id}`);

  const todoRepo: TodoInterface = TodoRepository.getInstance();
  const todo = todoRepo.read(id);

  if (todo) {
    res.json({ data: todo });
  } else {
    res.status(404).json();
  }
};

export const update: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  console.log(`Updating todo with id ${id}`);

  const name = (req.body as { name: string; description: string }).name;
  const description = (req.body as { text: string; description: string }).description;

  const todoRepo: TodoInterface = TodoRepository.getInstance();
  const updatedTodo = todoRepo.update(id, name, description);

  if (updatedTodo) {
    res.json({ data: updatedTodo });
  } else {
    res.status(404).json();
  }
};

export const destroy: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  console.log(`Deleting todo with id ${id}`);

  const todoRepo: TodoInterface = TodoRepository.getInstance();
  const statusCode = todoRepo.delete(id) ? 204 : 404;

  res.status(statusCode).json();
};
