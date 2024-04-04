'use client'
import { makeAutoObservable } from 'mobx';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

class TodoStore {
  todos: TodoItem[] = [];
  idCounter: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(text: string) {
    this.todos.push({ id: this.idCounter++, text, completed: false });
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodoCompletion(id: number) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }
}

const todoStore = new TodoStore();

export default todoStore;
