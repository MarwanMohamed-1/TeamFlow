import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/taskService';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/taskInterface';

@Component({
  selector: 'app-task-form-component',
  templateUrl: './task-form-component.html',
  styleUrls: ['./task-form-component.css'],
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
})
export class TaskFormComponent implements OnInit {
  task:any;
  tasks:any;
  @Output() formSubmitted = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup ;
  priorities = [
    { value: 'P1', label: 'Critical' },
    { value: 'P2', label: 'Major' },
    { value: 'P3', label: 'Medium' },
    { value: 'P4', label: 'Low' }
  ];
  
  statuses = ["To Do", "In Progress", "Done"];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private taskService:TaskService) {}

    private formatDateForInput(utcDate: string): string {
      const date = new Date(utcDate);
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return localDate.toISOString().slice(0, 16); // "yyyy-MM-ddTHH:mm"
    }
    
    ngOnInit(): void {
      this.form = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        status: ['To Do', Validators.required],
        dueDate: ['', Validators.required],
        priority: ['Low', Validators.required],
      });
    
      const taskId = this.route.snapshot.paramMap.get('id');
      console.log('taskId:', taskId);
    
      this.taskService.getTasks().subscribe(data => {
        this.tasks = data;
        this.task = this.tasks.find((task: Task) => task.id === Number(taskId));
        console.log('Found task:', this.task);
    
        if (this.task) {
          this.form.patchValue({
            title: this.task.title,
            description: this.task.description,
            status: this.task.status,
            dueDate: this.formatDateForInput(this.task.dueDate),
            priority: this.task.priority
          });
        }
      });
    }
    
  onSubmit() {
    if (!this.form.valid)return;
    const formValue = this.form.value;
    const task :Task = {
      ...formValue,
      id: this.task ? this.task.id : Date.now(),
  };
  this.formSubmitted.emit(task);
  this.form.reset();
}
onCancel() {
  this.router.navigate(['/tasks']);
}
}
