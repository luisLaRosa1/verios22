import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { AppConsts } from '../../../helpers/app.constants';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { LoginCommandsService } from '../../../services/autheticacion/login/commands/login.commands.service';
import { ILoginRequest, IOutputLoginRequest } from '../../../services/autheticacion/login/commands/login.commands.Interface';
import { IResponse } from '../../../helpers/interfaces/response';
import { Router, RouterModule } from '@angular/router';
import { IdleService } from '../../../helpers/services/idle.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Message } from 'primeng/api';
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
        RouterModule,
        MessagesModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: []
})
export class LoginComponent {
    loginService = inject(LoginCommandsService);
    router = inject(Router);
    idleService = inject(IdleService);
    message: Message[] = [];

    form = new FormGroup({
        correoElectronico: new FormControl('', [Validators.required, Validators.pattern(AppConsts.Patter.EmailAddress), Validators.maxLength(30)]),
        password: new FormControl('', [Validators.required]),
    });


    event_login() {
        let formValue = this.form.value;
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            this.message = [];
            if (this.form.controls.correoElectronico.invalid) {
                this.message.push({ severity: 'warn', summary: 'Correo electrónico es requerido' });
            }
            if (this.form.controls.password.invalid) {
                this.message.push({ severity: 'warn', summary: 'Contraseña es requerida' });
            }
            return;
        }

        //if (this.form.invalid) return;
        this.loginService.login(formValue as ILoginRequest).subscribe((response: any) => {
            if (response.status) {
                this.idleService.startIdle();
                this.router.navigate(['/dashboard']);
            }
        },
            (error) => {
                console.log("🚀 ~ LoginComponent ~ submit_form ~ error", error)
            }
        );
    }

    event_recover_password() {
        this.router.navigate(['/recover-password']);
    }
}
