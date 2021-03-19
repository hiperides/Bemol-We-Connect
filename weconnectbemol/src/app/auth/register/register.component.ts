import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group({
        //Dados Pessoais
        "pessoafisjur": ['', [Validators.required]],
        "nome": ['', [Validators.required]],
        "dtnascimento": ['', [Validators.required]],
        "sexo": ['', [Validators.required]],
        "rg": ['', [Validators.required]],
        "cpf": ['', [Validators.required]],
        "telefone": [''],
        "celular": ['', [Validators.required]],
        //Endereço
        "cep": ['', [Validators.required]],
        "endereco": ['', [Validators.required]],
        "cidade": ['', [Validators.required]],
        "estado": ['', [Validators.required]],
        "bairro": ['', [Validators.required]],
        "numero": ['', [Validators.required]],
        "complemento": ['', [Validators.required]],
        "referencia": ['', [Validators.required]],
        //Conta de Acesso
        "email": ['', [Validators.required]],
        "senha": ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
        "confirmasenha": ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
  }, { validator: this.compararSenhas});

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {

  }

  compararSenhas(group: FormGroup) {
    if(group){
      const senha = group.controls['senha'].value;
      const confirmasenha = group.controls['confirmasenha'].value;
      if(senha == confirmasenha){
        return null;
      }
    }
    return {comparar: false}
  }

  onSubmit(){
    console.log(this.formRegister.value);
    let u: User = { 
      ...this.formRegister.value,
      senha: this.formRegister.value.senha};
    this.AuthService.register(u)
    .subscribe(
      (u) => {
        alert('Usuário registrado com sucesso! Use suas crendeciais para logar')
          this.router.navigateByUrl('/auth/login');
      },
      (err) => {
        console.error(err);
        alert(err.error.message);
      }
    )
  }

  consultaCEP(cep, form){
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    this.resetaDadosForm(form);

    //Verifica se campo cep possui valor informado.
    if (cep !== "" && cep != null) {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
          .subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados, formulario){
      formulario.form.patchValue({
        endereco: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      });
  }

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: null,
      bairro: null,
      cidade: null,
      estado: null
    });
  }

}
