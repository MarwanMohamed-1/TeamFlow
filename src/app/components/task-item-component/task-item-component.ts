import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Task } from '../../models/taskInterface';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-task-item-component',
  imports: [DatePipe,RouterModule],
  templateUrl: './task-item-component.html',
  styleUrl: './task-item-component.css'
})
export class TaskItemComponent {
  constructor(private router : Router){}
  @Input() task! : Task;

  @Output() delete = new EventEmitter<number>();
  @Output() toggleStatus = new EventEmitter<Task>();
onDelete() {
  this.delete.emit(this.task.id);
}
onEdit() {
  this.router.navigate(['/tasks/Edit', this.task.id]);
}
onToggleStatus() {
this.toggleStatus.emit(this.task);
}
}
