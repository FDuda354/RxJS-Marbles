import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './models/User';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  private usersSubject = new BehaviorSubject<User[]>([]);
  readonly users$ = this.usersSubject.asObservable();


  constructor(private userService: UserService) {}

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.getUsers();

  }

  addUser() {
    const user = {
      name: 'ALA',
      role: 'USER',
    }
    this.userService.addUser(user).subscribe({
      next: () => {
        this.getUsers();
      }
    })
  }

  private getUsers() {
    this.userService.fetchUsers().subscribe(users => {
      this.usersSubject.next(users);
    })
  }

  subscribeDirectlyToHttp() {
    this.userService.fetchUsers().subscribe(users => {
      console.log('HTTP bezpośrednio A:', users);
    });

    this.userService.fetchUsers().subscribe(users => {
      console.log('HTTP bezpośrednio B:', users);
    });

    this.userService.fetchUsers().subscribe(users => {
      console.log('HTTP bezpośrednio C:', users);
    });
  }
}
