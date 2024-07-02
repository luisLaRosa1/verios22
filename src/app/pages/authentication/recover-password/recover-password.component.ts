

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { AppConsts } from '../../../helpers/app.constants';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { LoginCommandsService } from '../../../services/autheticacion/login/commands/login.commands.service';
import { Router, RouterModule } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { IRecoverPasswordRequest } from '../../../services/autheticacion/login/commands/login.commands.Interface';
;


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    InputIconModule,
    RouterModule
  ],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: []
})
export class RecoverPasswordComponent {
  loginService = inject(LoginCommandsService);
  router = inject(Router);

  form = new FormGroup({
    correoElectronico: new FormControl('', [Validators.required, Validators.pattern(AppConsts.Patter.EmailAddress), Validators.maxLength(30)]),
  });

  event_recover_password() {
    debugger;
    let formValue = this.form.value;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    let request: IRecoverPasswordRequest = {
      correoElectronico: formValue!.correoElectronico || ''
    };
    this.loginService.recoverPassword(request).subscribe(() => {
      this.router.navigate(['/login']);
    });

  }

  event_return_login() {
    this.router.navigate(['/login']);
  }
}
