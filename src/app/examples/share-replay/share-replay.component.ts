import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, shareReplay, Subscription} from 'rxjs';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-share-replay',
  standalone: false,
  templateUrl: './share-replay.component.html',
  styleUrl: './share-replay.component.scss'
})
export class ShareReplayComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  sharedUsers$!: Observable<User[]>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.setupSharedUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setupSharedUsers() {
    this.sharedUsers$ = this.userService.fetchUsers().pipe(
      shareReplay(1)
    );
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

  subscribeSharedHttp() {
    this.subscription.add(
      this.sharedUsers$.subscribe(users => {
        console.log('Multicast A:', users);
      })
    );

    this.subscription.add(
      this.sharedUsers$.subscribe(users => {
        console.log('Multicast B:', users);
      })
    );
  }
}
