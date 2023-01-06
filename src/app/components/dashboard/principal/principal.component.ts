import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BuscarService } from 'src/app/services/buscar.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  loading = false
  buscaColeccion: FormGroup
  resultadosEncontrados: Array<any>

  constructor(private fb: FormBuilder,
              private buscarService: BuscarService,
              private toastr: ToastrService) {

    this.buscaColeccion = this.fb.group({
      coleccion: ['', Validators.required],
      termino: ['', Validators.required]
    })

    this.resultadosEncontrados = []
  }

  buscarColeccion() {
    this.loading = true
    this.buscarService.searchColeccion(this.buscaColeccion.value.coleccion,this.buscaColeccion.value.termino).subscribe({
      next: data => {
      // console.log(data.results)
      this.loading = false
      this.resultadosEncontrados = data.results
      // console.log(this.categoriasEncontradas.forEach((item)=>{
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

}
