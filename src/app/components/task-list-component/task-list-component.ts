import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/taskService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/taskInterface';
import { TaskItemComponent } from "../task-item-component/task-item-component";
import { TaskFormComponent } from "../task-form-component/task-form-component";
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-task-list-component',
  imports: [RouterModule, CommonModule, FormsModule, TaskItemComponent],
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.css'
})
export class TaskListComponent implements OnInit {
  
  tasks: any[] = [];
  filteredTasks: any[] = [];
  statuses = ["To Do", "In Progress", "Done"];
  selectedStatus: string = '';
  showForm: boolean = false;
  selectedTask:Task | null = null;
  @Input() newTaskAdded:Task | null = null; 

  constructor(private service:TaskService,private router :Router) {}
  
  ngOnInit(): void {
    this.filteredTasks = this.tasks;
    this.loadData();
  }

  lloadData() {
  this.service.getTasks().subscribe((data:Task[]) => {
    this.tasks = data;
    this.applyFilter();

    // ✅ Handle incoming task from shared service
    const incomingTask = this.service.taskToEditOrAdd;
    if (incomingTask) {
      this.handleFormSubmit(incomingTask);
      this.service.taskToEditOrAdd = null; // Reset
    }
  });
}
loadData() {
  this.tasks = this.service.getTasks(); // no subscribe needed
  const incomingTask = this.service.taskToEditOrAdd;

  if (incomingTask) {
    this.handleFormSubmit(incomingTask);
    this.service.taskToEditOrAdd = null;
    this.service.saveTasks(this.tasks); // save changes
  }

  this.applyFilter();
}

  
  applyFilter() {
    this.filteredTasks= this.selectedStatus
    ? this.tasks.filter(task => task.status === this.selectedStatus)
    : this.tasks;
    return this.filteredTasks;
  }
  clearFilter() {
    this.selectedStatus = '';
    this.filteredTasks = [...this.tasks];
  }
handleDelete(taskId: number){
  //we can use dialog component to confirm deletion
  //but for simplicity we are using confirm dialog
  const confirmed = confirm("Are you sure you want to delete this task?");
  if (confirmed){
    this.tasks = this.tasks.filter(t=> t.id !== taskId);
    this.applyFilter();
  }
}
handleToggleStatus(task: Task) {
  const currentIndex = this.statuses.indexOf(task.status);
  const nextIndex = (currentIndex + 1) % this.statuses.length;
  // i made this step using github copilot
  task.status = this.statuses[nextIndex] as "To Do" | "In Progress" | "Done";
  this.applyFilter();
}

openAddform() {
  this.selectedTask = null;
  this.router.navigate(['/tasks/add']);
}
openEditForm(task: Task) {
  this.router.navigate(['/tasks/edit', task.id], { state: { task} });
}
handleFormSubmit(task: Task) {
  const existingIndex = this.tasks.findIndex(t => t.id === task.id);
  if (existingIndex !== -1) {
    this.tasks[existingIndex] = task;
  } else {
    this.tasks.push(task);
  }

  // ✅ Save the updated list
  this.service.saveTasks(this.tasks);

  this.applyFilter();
}


}