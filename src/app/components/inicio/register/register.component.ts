import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loading = false
  register: FormGroup

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private toastr: ToastrService) {
    this.register = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: [''],
      rol: ['ADMIN_ROLE']
    }, {validators: [this.checkPassword]} as AbstractControlOptions)
  }

  registrarUsuario(): void {
    console.log(this.register)

    const usuario: Usuario = {
      nombre: this.register.value.nombre,
      correo: this.register.value.correo,
      password: this.register.value.password,
      rol: this.register.value.rol
    }
    this.loading = true
    this.usuarioService.saveUser(usuario).subscribe({
      next: data => {
          console.log(data)
          this.toastr.success('El usuario ' + usuario.nombre + ' fue registrado con exito!', 'Usuario Registrado')
          this.router.navigate(['/inicio/login'])
          this.loading = false
        },
      error: error => {
          this.loading = false
          console.log(error)
          this.toastr.error(error.error.errors[0].msg, 'Error!')
          this.register.reset()
        },
    })
    // this.usuarioService.saveUser(usuario).subscribe(data => {
    //   console.log(data)
    //   this.toastr.success('El usuario' + usuario.nombre + 'fue registrado con exito!', 'Usuario Registrado')
    //   this.router.navigate(['/inicio/login'])
    //   this.loading = false
    // }, error => {
    //   this.loading = false
    //   console.log(error)
    //   this.toastr.error(error.error.errors[0].msg, 'Error!')
    //   this.register.reset()
    // })
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : {notSame: true}
  }
}
