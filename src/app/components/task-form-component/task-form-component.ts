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
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class TaskFormComponent implements OnInit {
  task: Task | null = null;
  tasks: Task[] = [];
  @Output() formSubmitted = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

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
    private taskService: TaskService
  ) {}

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

    // Try to get task from navigation state first
    const taskFromState = history.state.task as Task | undefined;
    const taskId = this.route.snapshot.paramMap.get('id');

    if (taskFromState) {
      this.task = taskFromState;
    } else if (taskId) {
      this.tasks = this.taskService.getTasks();
      this.task = this.tasks.find(task => task.id === Number(taskId)) || null;
    }

    if (this.task) {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        dueDate: this.formatDateForInput(this.task.dueDate),
        priority: this.task.priority
      });
    }
  }

  onSubmit() {
    if (!this.form.valid) return;

    const formValue = this.form.value;
    const task: Task = {
      ...formValue,
      id: this.task ? this.task.id : Date.now(),
    };

    this.taskService.taskToEditOrAdd = task;
    this.router.navigate(['/tasks']);
    this.form.reset();
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }
}
