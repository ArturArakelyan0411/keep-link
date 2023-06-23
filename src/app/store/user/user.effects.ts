import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, switchMap, take, tap } from 'rxjs';

// Services
import { UserService } from '../../core/services/user.service';

// Store
import { AppStore } from '../app.reducer';
import { selectAuthId } from '../auth';

// Actions
import {
  getUser,
  getUserFulfilled,
  getUserRejected,
  addUser,
  addUserFulfilled,
  addUserRejected,
} from './user.actions';

@Injectable()
export class UserEffects {
  getUser = createEffect(() => this.actions$.pipe(
    ofType(getUser),
    switchMap(() => {
      return this.store.select(selectAuthId)
        .pipe(
          take(1),
          switchMap((uid) => {
            if (!uid) {
              return of(getUserRejected());
            }

            return this.userService.getUser(uid)
              .pipe(
                switchMap((user) => {
                  return of(getUserFulfilled({ payload: user }));
                }),
                catchError((error) => {
                  this.toast.error(error.message);
                  return of(getUserRejected());
                }),
              );
          }),
        );
    }),
  ));

  addUser = createEffect(() => this.actions$.pipe(
    ofType(addUser),
    switchMap(({ payload }) => {
      return this.userService.addUser(payload, payload.id)
        .pipe(
          switchMap(() => {
            return of(addUserFulfilled({ payload }));
          }),
          catchError((error) => {
            this.toast.error(error.message);
            return of(addUserRejected());
          }),
        );
    }),
  ));

  addedUser = createEffect(() => this.actions$.pipe(
    ofType(addUserFulfilled, addUserRejected),
    tap(({ type }) => {
      if (type.toLocaleLowerCase().includes('rejected')) {
        this.userService.addedUser$.error('');
        return;
      }

      this.userService.addedUser$.next(true);
    }),
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private toast: ToastrService,
    private store: Store<AppStore>,
  ) {}
}
