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
  @Input() task:Task | null = null;
  @Output() formSubmitted = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup ;
  priorities = ["Low", "Medium", "Major", "Critical"];
  statuses = ["To Do", "In Progress", "Done"];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required,Validators.minLength(3)],
      description: ['', Validators.required,Validators.minLength(10)],
      status: ['To Do', Validators.required,Validators.pattern('^(To Do|In Progress|Done)$')],
      dueDate: ['', Validators.required],
      priority: ['Low', Validators.required],
    });

    if (this.task) {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        dueDate: this.task.dueDate,
      });
    }
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
  this.cancel.emit();
}
}
