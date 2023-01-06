import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//modulos
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from "@auth0/angular-jwt";

//interceptor
import { AddTokenInterceptor } from '../app/helpers/add-token.interceptor'

//componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { CategoriasComponent } from './components/dashboard/categorias/categorias.component';
import { ProductoComponent } from './components/dashboard/producto/producto.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './shared/modal/modal.component';
import { UsuariosComponent } from './components/dashboard/usuarios/usuarios.component';
import { PrincipalComponent } from './components/dashboard/principal/principal.component';

// export function tokenGetter() {
//   return localStorage.getItem("access_token");
// }

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    LoadingComponent,
    CategoriasComponent,
    ProductoComponent,
    ModalComponent,
    UsuariosComponent,
    PrincipalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    // JwtModule.forRoot(
    //   {
    //   config: {
    //     tokenGetter: tokenGetter,
    //     allowedDomains: ["prueba-tecnica-idecide.azurewebsites.net"],
    //     disallowedRoutes: ["http://example.com/examplebadroute/"],
    //   },
    // }
    // ),
    NgbModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
