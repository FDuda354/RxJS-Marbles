import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  fetchUserStatus(): Observable<string> {
    return this.http.get<string>('/api/users/status');
  }

  addUser(user: User): Observable<void> {
    return this.http.post<void>('/api/users', user);
  }
}
