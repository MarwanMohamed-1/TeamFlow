import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/taskService';

@Component({
  selector: 'app-task-list-component',
  imports: [],
  templateUrl: './task-list-component.html',
  styleUrl: './task-list-component.css'
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  constructor(private service:TaskService) {}
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.service.getTasks().subscribe((data=>{
      this.tasks=data;
    }) )
  }
  
  

}
