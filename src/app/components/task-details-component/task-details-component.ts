import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from '../../services/taskService';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/taskInterface';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task-details-component',
  imports: [DatePipe],
  templateUrl: './task-details-component.html',
  styleUrl: './task-details-component.css'
})
export class TaskDetailsComponent implements OnInit {
  constructor(private taskService:TaskService,private route:ActivatedRoute){}
  task:any;
   ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    const tasksJson = localStorage.getItem('tasks');

    if (tasksJson) {
      const tasks: Task[] = JSON.parse(tasksJson);
      this.task = tasks.find(t => t.id === taskId);
    }
  }
}