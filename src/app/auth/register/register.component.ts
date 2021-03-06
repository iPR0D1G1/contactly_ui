import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { StoreService } from 'src/app/services/store/store.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  duration = 2000;

  constructor(private _formBuilder: FormBuilder, private _auth_service: AuthService, private _snackBar: MatSnackBar) {
  }

  onSubmit = () => {
    this.loading = true;
    const { value } = this.loginForm
    this._auth_service.register(value).pipe(take(1))
      .subscribe(
        {
          error: e => {
            this.loading = false
            this._snackBar.openFromComponent(SnackbarComponent, {
              duration: this.duration,
              data: { type: 'error', text: 'There was a error' }
            });
          },
          complete: () => {
            this.loading = false
            this._snackBar.openFromComponent(SnackbarComponent, {
              duration: this.duration,
              data: { type: 'success', text: 'Success' }
            });
            this.loading = false
          }
        })
  }



  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: this._formBuilder.control(
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]),

      // profile_photo: this._formBuilder.control(
      //   '',
      //   [
      //     Validators.required,
      //     // Validators.minLength(4),
      //     // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      //   ]),

      password: this._formBuilder.control(
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]),
    })
  }

}
