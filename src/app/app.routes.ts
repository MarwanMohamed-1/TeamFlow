import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list-component/task-list-component';
import { TaskFormComponent } from './components/task-form-component/task-form-component';
import { TaskDetailsComponent } from './components/task-details-component/task-details-component';

export const routes: Routes = [
    {path:"",component:TaskListComponent},    
    {path:"tasks",component:TaskListComponent},    
    {path:'tasks/add',component:TaskFormComponent},    
    {path:"tasks/edit/:id",component:TaskFormComponent},
    {path:"tasks/:id",component:TaskDetailsComponent},
];
