import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskFormComponent } from "./components/task-form-component/task-form-component";
import { TaskListComponent } from "./components/task-list-component/task-list-component";

@Component({
  selector: 'app-root',
  imports: [TaskListComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
