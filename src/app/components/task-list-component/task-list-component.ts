import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/taskService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/taskInterface';
import { TaskItemComponent } from "../task-item-component/task-item-component";
import { TaskFormComponent } from "../task-form-component/task-form-component";
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-task-list-component',
  imports: [RouterModule, CommonModule, FormsModule, TaskItemComponent, TaskFormComponent],
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
  constructor(private service:TaskService,private router :Router) {}
  
  ngOnInit(): void {
    this.filteredTasks = this.tasks;
    this.loadData();
  }

  loadData(){
    this.service.getTasks().subscribe((data=>{
      this.tasks=data;
      this.applyFilter();
    }) )
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

handleEdit(task: Task) {
  this.selectedTask = task;
  this.showForm = true;
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
  this.showForm = true;
}
openEditForm(task: Task) {
  this.selectedTask = task;
  this.showForm = true;
}
closeForm() {
  this.showForm = false;
  this.selectedTask = null;
}
handleFormSubmit(task: Task) {
  if(this.selectedTask)
  {
    //This line updates a task in thetasks array 
    // by replacing the old version with the new one (based on matching id)
    this.tasks = this.tasks.map(t => t.id === task.id ? task : t);
  }else{
    this.tasks.push(task);
  }
  this.applyFilter();
  this.closeForm();
  this.selectedTask = null;
}
}