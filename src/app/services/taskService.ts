import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/taskInterface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http:HttpClient) { }
  public taskToEditOrAdd : Task | null=null; 
  private jsonUrl = "assets/mock-tasks.json";
  private localStorageKey = 'tasks';
  getTasks(){
    const local = localStorage.getItem(this.localStorageKey);
    if(local)
    {
      return JSON.parse(local);
    }else{
      return this.http.get<any>(this.jsonUrl);
    }
  }
  saveTasks(tasks: Task[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  clearStorage() {
    localStorage.removeItem(this.localStorageKey);
  }
}
