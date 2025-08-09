
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
        selector: 'app-register',
        standalone: true,
        templateUrl: './register.component.html',
        imports: [ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });
  submit(){ if(this.form.valid){ this.auth.register(this.form.value as any).subscribe(() => window.location.href='/login'); } }
}
