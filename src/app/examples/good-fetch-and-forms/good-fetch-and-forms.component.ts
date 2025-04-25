import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, delay, finalize, Observable, of, Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {catchError, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-good-fetch-and-forms',
  standalone: false,
  templateUrl: './good-fetch-and-forms.component.html',
  styleUrl: './good-fetch-and-forms.component.scss'
})
export class GoodFetchAndFormsComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  loading$ = new BehaviorSubject<boolean>(false);
  loginError$ = new BehaviorSubject<boolean>(false);

  addUserForm!: FormGroup;


  constructor(private userService: UserService, private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      surName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    this.loginError$.next(false);
    this.loading$.next(true);
    this.userService.addUser(this.addUserForm.value).pipe(
      delay(1000),
      finalize(() => this.loading$.next(false))
    ).subscribe({
      next: res => {
        this.getUsers();
        this.addUserForm.reset();
      },
      error: err => {
        this.loginError$.next(true);
      },
    });
  }

  private getUsers(): void {
    this.loading$.next(true);
    this.loginError$.next(false);
    this.userService.fetchUsers().pipe(
      finalize(() => this.loading$.next(false)),
      catchError(err => {
        this.loginError$.next(true);
        return of([]);
      }),
      takeUntil(this.destroy$)
    ).subscribe(users => this.usersSubject.next(users));
  }
}
