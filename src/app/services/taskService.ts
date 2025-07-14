import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/taskInterface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http:HttpClient) { }
  private jsonUrl = "assets/mock-tasks.json";
  getTasks(){
    return this.http.get<any>(this.jsonUrl);
  }
}
