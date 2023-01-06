import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioLogin } from 'src/app/models/usuarioLogin';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false
  login: FormGroup

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private loginService: LoginService) {
    this.login = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  log(): void {
    // console.log(this.login)

    const usuario: UsuarioLogin = {
      correo: this.login.value.correo,
      password: this.login.value.password
    }
    this.loading = true
    this.loginService.login(usuario).subscribe({
      next: data => {
      // console.log(data)
      this.loading = false
      // this.loginService.setLocalStorage(data.usuario.nombre)
      this.loginService.setLocalStorage(data.token)
      this.router.navigate(['/dashboard'])
      },
      error: error => {
      // console.log(error)
      this.loading = false
      this.toastr.error(error.error.msg, 'Error!')
      this.login.reset()
      }
  })

    // setTimeout(() => {
    //   if(usuario.correo === 'jhon' && usuario.password === "1234" ) {
    //     this.login.reset()
    //     this.router.navigate(['/dashboard'])
    //   }else {
    //     // this.toastr.error('Usuario o Contraseña inconrrecto', 'Error')
    //     this.login.reset()
    //   }
    //   this.loading = false
    // },3000)

    // console.log(usuario)
  }
}
