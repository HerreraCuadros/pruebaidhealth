import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  //nombreUser: string
  constructor(private loginService: LoginService,
              private router: Router) {
    //this.nombreUser = this.loginService.getNombreUser()
  }
  getTokenUser(): void {
    console.log(this.loginService.getTokenDecoded())
  }

  logOut(): void {
    this.loginService.removeLocalStorage()
    this.router.navigate(['/inicio'])
  }

}
