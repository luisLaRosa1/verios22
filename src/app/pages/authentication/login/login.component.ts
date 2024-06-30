import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { AppConsts } from '../../../helpers/app.constants';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FloatLabelModule,
        InputTextModule,
        PasswordModule,
        ButtonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: []
})
export class LoginComponent {
    form = new FormGroup({
        usuario: new FormControl('', [Validators.required, Validators.pattern(AppConsts.Patter.EmailAddress)]),
        password: new FormControl('', [Validators.required]),
    });


    submit_form() {
        let formValue = this.form.value;
        if (this.form.invalid) return;
        console.log("🚀 ~ LoginComponent ~ submit_form ~ formValue:", formValue)
    }
}
