import { Injectable, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  userIdle = inject(UserIdleService);
  router = inject(Router);

  constructor() { }

  startIdle() {
    console.log('startIdle');
    //this.userIdle.setConfigValues({ idle: 60, timeout: 10, ping: 120 });

    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => {
      console.log(count);
    });

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.stopWatching();
      // logout
      removeCookie('token');
      removeCookie('refreshToken');

      this.router.navigate(['/login']);
    });
  }

  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }

}
