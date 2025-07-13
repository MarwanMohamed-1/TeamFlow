import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/taskInterface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  updateTask(id: string, value: any) {
    return this.http.put<Task>(`${this.jsonUrl}?id=${id}`, value);
  }
  createTask(task: any) {
    return this.http.post<Task>(this.jsonUrl, task);
  }
  constructor(private http:HttpClient) { }
  private jsonUrl = "assets/mock-tasks.json";
  getTasks(){
    return this.http.get<any>(this.jsonUrl);
  }
  getTaskById(id: any) {
    return this.http.get<any>(`${this.jsonUrl}/details/${id}`);
  }
}
