import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  modalSwitch: boolean
  loading = false
  listProducto: Array<any>
  listCategoria: Array<any>
  nombreProducto: FormGroup
  editarNombreProducto: FormGroup
  idCategoria = ''

  constructor(private fb: FormBuilder,
              private productoService: ProductoService,
              private toastr: ToastrService,
              private categoriaService: CategoriaService) {
    this.nombreProducto = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required]
    })
    this.editarNombreProducto = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required]
    })
    this.listProducto = []
    this.listCategoria = []
    this.modalSwitch = false
  }

  ngOnInit(): void {
      this.obtenerListProducto()
      this.obtenerListCategoria()
  }

  openModal(id:string){
    this.idCategoria = id
    this.modalSwitch = true
  }

  guardarProducto(): void {
    this.loading = true
    // console.log(this.nombreProducto)
    const producto: Producto = {
      nombre: this.nombreProducto.value.nombre,
      categoria: this.nombreProducto.value.categoria,
    }
    this.productoService.saveProducto(producto).subscribe({
      next: data => {
      // console.log(data)
      this.loading = false
      this.toastr.success('El producto ' + producto.nombre + ' fue guardado con exito!', 'Producto guardado')
      },
      error: error => {
      // console.log(error)
      this.loading = false
      this.toastr.error(error.error.msg, 'Error!')
      this.nombreProducto.reset()
      },
      complete: () => {
        this.obtenerListCategoria()
        this.obtenerListProducto()
        this.nombreProducto.reset()
      }
  })
  }

  obtenerListProducto() {
    this.loading = true
    this.productoService.getListProducto().subscribe({
      next: data => {
        this.listProducto = data.productos
        this.loading = false
      // console.log(data)
      // console.log(this.listProducto.forEach((item)=>{
      //   console.log(item._id)
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

  editarProducto(id: string) {
    this.loading = true
    // console.log(this.editarNombreProducto)
    const producto: Producto = {
      nombre: this.editarNombreProducto.value.nombre,
      categoria: this.editarNombreProducto.value.categoria,
    }
    this.productoService.editProducto(id, producto).subscribe({
      next: data => {
      // console.log(data)
      this.loading = false
      this.toastr.success('El producto ' + producto.nombre + ' fue editado con exito!', 'Producto editado')
      },
      error: error => {
      // console.log(error)
      this.loading = false
      //this.toastr.error(error.error.msg, 'Error!')
      //this.login.reset()
      },
      complete: () => {
        this.obtenerListCategoria()
        this.obtenerListProducto()
        this.editarNombreProducto.reset()
      }
  })
  this.modalSwitch = false
  }

  eliminarProducto(id: string){
    this.loading = true
    this.productoService.deleteProducto(id).subscribe({
      next: data => {
      // console.log(data)
      this.loading = false
      },
      error: error => {
        this.loading = false
        this.toastr.error(error.error.msg, 'Error!')
      // console.log(error)
      //this.loading = false

      //this.login.reset()
      },
      complete: () => {
        this.obtenerListCategoria()
        this.obtenerListProducto()
      }
  })
  }

  obtenerListCategoria() {
    this.loading = true
    this.categoriaService.getListCategoria().subscribe({
      next: data => {
      // console.log(data)
      this.listCategoria = data.categorias
      this.loading = false
      // console.log(this.listCategoria.forEach((item)=>{
      //   console.log(item._id)
      // }))
      //this.loading = false
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
