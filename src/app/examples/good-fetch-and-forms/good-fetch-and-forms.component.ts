import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, delay, finalize, Observable, Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-good-fetch-and-forms',
  standalone: false,
  templateUrl: './good-fetch-and-forms.component.html',
  styleUrl: './good-fetch-and-forms.component.scss'
})
export class GoodFetchAndFormsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();


  private usersSubject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  loading$ = new BehaviorSubject<boolean>(false);
  loginError$ = new BehaviorSubject<boolean>(false);

  addUserForm!: FormGroup;


  constructor(private userService: UserService, private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.loginError$.next(false);
    this.loading$.next(true);
    this.userService.addUser(this.addUserForm.value).pipe(
      delay(1000),
      finalize(() => this.loading$.next(false))
    ).subscribe({
      next: res => console.log('Zalogowano', res),
      error: err => {
        console.error('Błąd logowania', err);
        this.loginError$.next(true);
      },
    });
  }

  private getUsers() {
    this.userService.fetchUsers().subscribe(users => {
      this.usersSubject.next(users);
    })
  }
}
