import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'senha': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
  })

  loading = false;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const credenciais = this.loginForm.value;
    this.loading = true;
    this.AuthService.login(credenciais)
      .subscribe(
        (user) => {
          console.log(user);
          alert('Logado com sucesso. Seja bem-vindo!' + user.nome + '!');
            this.router.navigateByUrl('/');
            this.loading = false;
        },
        (err) => {
          console.log(err)
          alert('Ocorreu um erro ao efetuar o Login');
          this.loading = false
        }
      )
  }

}
