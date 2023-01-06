import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { BuscarService } from 'src/app/services/buscar.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SwitchService } from 'src/app/services/switch.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  modalSwitch: boolean
  loading = false
  listCategoria: Array<any>
  nombreCategoria: FormGroup
  editarNombreCategoria: FormGroup
  idCategoria = ''
  categoriasEncontradas: Array<any>
  buscaCategoria: FormGroup

  constructor(private fb: FormBuilder,
              private categoriaService: CategoriaService,
              private toastr: ToastrService,
              private modalSS: SwitchService,
              private buscarService: BuscarService) {

    this.nombreCategoria = this.fb.group({
      nombre: ['', Validators.required]
    })

    this.editarNombreCategoria = this.fb.group({
      nombre: ['', Validators.required]
    })

    this.buscaCategoria = this.fb.group({
      termino: ['', Validators.required]
    })

    this.listCategoria = []
    this.categoriasEncontradas = []
    this.modalSwitch = false
  }

  ngOnInit(): void {
      this.obtenerListCategoria()
      this.modalSS.$modal.subscribe((valor)=>{this.modalSwitch = valor})
  }

  openModal(id:string){
    this.idCategoria = id
    this.modalSwitch = true
  }

  guardarCategoria(): void {
    this.loading = true
    // console.log(this.nombreCategoria)
    const categoria: Categoria = {
      nombre: this.nombreCategoria.value.nombre,
    }
    this.categoriaService.saveCategoria(categoria).subscribe({
      next: data => {
      // console.log(data)
      this.toastr.success('La categoria ' + categoria.nombre + ' fue guardada con exito!', 'Categoria guaradada')
      this.loading = false
      },
      error: error => {
      // console.log(error)
      this.loading = false
      this.toastr.error(error.error.msg, 'Error!')

      },
      complete: () => {
        this.obtenerListCategoria()
        this.nombreCategoria.reset()}
  })
  }

  obtenerListCategoria() {
    this.loading = true
    this.categoriaService.getListCategoria().subscribe({
      next: data => {
      // console.log(data)
      this.listCategoria = data.categorias
      // console.log(this.listCategoria.forEach((item)=>{
      //   console.log(item._id)
      // }))
      this.loading = false
      },
      error: error => {
      // console.log(error)
      this.loading = false
      this.toastr.error(error.error.msg, 'Error!')
      //this.login.reset()
      }
  })
  }

  editarCategoria(id: string) {
    this.loading = true
    // console.log(this.editarNombreCategoria)
    const categoria: Categoria = {
      nombre: this.editarNombreCategoria.value.nombre,
    }
    this.categoriaService.editCategoria(id, categoria).subscribe({
      next: data => {
      // console.log(data)
      this.loading = false
      this.toastr.success('La categoria ' + categoria.nombre + ' fue editada con exito!', 'Categoria editada')
      },
      error: error => {
      // console.log(error)
      this.loading = false
      this.toastr.error(error.error.msg, 'Error!')
      this.editarNombreCategoria.reset()
      },
      complete: () => {this.obtenerListCategoria()}
  })
  this.modalSwitch = false
  }

  eliminarCategoria(id: string){
    this.loading = true
    this.categoriaService.deleteCategoria(id).subscribe({
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
      complete: () => {this.obtenerListCategoria()}
  })
  }

  buscarCategoria() {
    this.buscarService.searchColeccion('categorias',this.buscaCategoria.value.termino).subscribe({
      next: data => {
      // console.log(data.results)
      this.categoriasEncontradas = data.results
      this.loading = false
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
