import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import CreateTaskDto from '../dtos/create-task.dto';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  serviceUrl: string = '';

  constructor(private http: HttpClient) {
    this.serviceUrl = 'http://localhost:3000/todos/';
  }

  addTask(createTaskDto: CreateTaskDto): Observable<Task> {
    const userJsonString = localStorage.getItem('user');

    let user = null;

    if (userJsonString != null) {
      user = JSON.parse(userJsonString);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.post<Task>(this.serviceUrl, createTaskDto, httpOptions);
  }

  getTasks(): Observable<Task[]> {
    const userJsonString = localStorage.getItem('user');

    let user = null;

    if (userJsonString != null) {
      user = JSON.parse(userJsonString);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.get<Task[]>(this.serviceUrl, httpOptions);
  }

  editTask(task: Task): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.put<Task>(this.serviceUrl + task.id, task, httpOptions);
  }

  deleteTask(task: Task): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };

    return this.http.delete<Task>(this.serviceUrl + task.id, httpOptions);
  }
}
