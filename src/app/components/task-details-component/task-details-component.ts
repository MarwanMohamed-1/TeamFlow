import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from '../../services/taskService';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/taskInterface';

@Component({
  selector: 'app-task-details-component',
  imports: [],
  templateUrl: './task-details-component.html',
  styleUrl: './task-details-component.css'
})
export class TaskDetailsComponent implements OnInit {
  constructor(private taskService:TaskService,private route:ActivatedRoute){}
  // @Input() task: Task= {
  //   title: '',
  //   description: '',
  //   status: 'To Do',
  //   id: 0,
  //   dueDate: '',
  //   priority: 'P1'
  // };
  tasks:any;
  task:any;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
      this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = data;
      this.task = this.tasks.find((task: Task) => task.id === parseInt(id!));
      });
    console.log(this.task);
  }
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() toggleStatus = new EventEmitter<void>();
  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  onToggleStatus() {
    this.toggleStatus.emit();
  }
}