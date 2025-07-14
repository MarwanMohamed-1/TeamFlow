import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Task } from '../../models/taskInterface';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task-item-component',
  imports: [DatePipe],
  templateUrl: './task-item-component.html',
  styleUrl: './task-item-component.css'
})
export class TaskItemComponent {
  @Input() task! : Task;

  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();
  @Output() toggleStatus = new EventEmitter<Task>();
onDelete() {
  this.delete.emit(this.task.id);
}
onEdit() {
this.edit.emit(this.task);
}
onToggleStatus() {
this.toggleStatus.emit(this.task);
}
}
