import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './components/dashboard/categorias/categorias.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PrincipalComponent } from './components/dashboard/principal/principal.component';
import { ProductoComponent } from './components/dashboard/producto/producto.component';
import { UsuariosComponent } from './components/dashboard/usuarios/usuarios.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';

//guard
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, children: [
    { path: '', component: LoginComponent},
    { path: 'register', component: RegisterComponent}
  ]},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], children: [
    { path: '', component: PrincipalComponent},
    { path: 'categorias', component: CategoriasComponent},
    { path: 'productos', component: ProductoComponent},
    { path: 'usuarios', component: UsuariosComponent}
  ]},
  {path: '**', redirectTo: '/incio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
