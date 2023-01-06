import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EditUsuario } from 'src/app/models/editGetUsuario';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  loading = false
  register: FormGroup
  editarDatosUsuario: FormGroup
  listUsuario: Array<any>
  idUsuario = ''
  modalSwitch: boolean

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private toastr: ToastrService) {
    this.register = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: [''],
      rol: ['ADMIN_ROLE']
    }, {validators: [this.checkPassword]} as AbstractControlOptions)

    this.editarDatosUsuario = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: [''],
      rol: ['ADMIN_ROLE']
    }, {validators: [this.checkPassword]} as AbstractControlOptions)

    this.listUsuario = []
    this.modalSwitch = false
  }

  ngOnInit(): void {
    this.obtenerListUsuarios()
  }

  openModal(id:string){
    this.idUsuario = id
    this.modalSwitch = true
  }

  registrarUsuario(): void {
    // console.log(this.register)
    const usuario: Usuario = {
      nombre: this.register.value.nombre,
      correo: this.register.value.correo,
      password: this.register.value.password,
      rol: this.register.value.rol
    }
    this.loading = true
    this.usuarioService.saveUser(usuario).subscribe({
      next: data => {
          // console.log(data)
          this.toastr.success('El usuario' + usuario.nombre + 'fue registrado con exito!', 'Usuario Registrado')
          this.loading = false
        },
      error: error => {
          this.loading = false
          // console.log(error)
          this.toastr.error(error.error.errors[0].msg, 'Error!')

        },
        complete: () => {
          this.obtenerListUsuarios()
          this.register.reset()
        }
    })
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : {notSame: true}
  }

  obtenerListUsuarios() {
    this.usuarioService.getListUsuario().subscribe({
      next: data => {
      // console.log(data)
      this.listUsuario = data.usuarios
      this.loading = false
      // console.log(this.listUsuario.forEach((item)=>{
      //   console.log(item.nombre)
      // }))
      },
      error: error => {
      // console.log(error)
      this.loading = false
      this.toastr.error(error.error.msg, 'Error!')
      //this.login.reset()
      }
  })
  }

  editarUsuario(id: string) {
    // console.log(this.editarDatosUsuario)
    const usuario: Usuario = {
      nombre: this.editarDatosUsuario.value.nombre,
      correo: this.editarDatosUsuario.value.correo,
      password: this.editarDatosUsuario.value.password,
      rol: this.editarDatosUsuario.value.rol
    }
    this.loading = true
    this.usuarioService.editUsuario(id, usuario).subscribe({
      next: data => {
      // console.log(data)
      this.toastr.success('El usuario' + usuario.nombre + 'fue editadodo con exito!', 'Usuario editado')
      },
      error: error => {
      // console.log(error)
      this.loading = false
      this.toastr.error(error.error.msg, 'Error!')
      //this.login.reset()
      },
      complete: () => {
        this.obtenerListUsuarios()
        this.editarDatosUsuario.reset()
      }
  })
  this.modalSwitch = false
  }

  eliminarUsuario(id: string){
    this.loading = true
    this.usuarioService.deleteUsuario(id).subscribe({
      next: data => {
      // console.log(data)
      this.loading = false
      },
      error: error => {
      // console.log(error)
      this.loading = false
      this.toastr.error(error.error.msg, 'Error!')
      //this.login.reset()
      },
      complete: () => {this.obtenerListUsuarios()}
  })
  }
}
