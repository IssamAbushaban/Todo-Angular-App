import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
@Component({
  selector: 'app-todo',
  imports: [NgFor, NgIf],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  showNoTextError = signal(false);

  newTodo = signal('');
  todos = signal<Todo[]>([]);

  addTodo(event: Event) {
    event.preventDefault();
    const text = this.newTodo().trim();
    
    if (!text) {
      this.showNoTextError.set(true);
      return;
    }

    const newTask: Todo = {
      id: Date.now(),
      text,
      completed: false
    }

    this.todos.update(current => [...current, newTask])
    this.newTodo.set('');
    this.showNoTextError.set(false); // hide error if it was showing
    
  }

}
