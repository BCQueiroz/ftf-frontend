import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginViewService } from './login-view-service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [ FormsModule, HttpClientModule ],
  providers : [ LoginViewService ],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss'
})
export class LoginViewComponent implements OnInit {

  email? : string
  password?: string

  constructor(private loginService: LoginViewService, private router: Router) {
  }

  ngOnInit(): void {
    this.email = ""
    this.password = ""
  }

  async authenticateAndLogin(){
    if(!Boolean(this.email)){
      console.log("Email não informado!")
      return
    }
    if(!Boolean(this.password)){
      console.log("Senha não informada!")
      return
    }
    const emailValidated: string = this.email!
    const passwordValidated: string = this.password!

    await this.loginService.authenticateUser(emailValidated, passwordValidated).subscribe(
      (response) => {
        if(response && response.success && response.result.userLoggedInfo) {
          this.redirectToHomePage(response.result.userLoggedInfo)
        }
      }
    )
  }

  redirectToHomePage(userInfo: any) {
    this.loginService.startSession(userInfo.idUser.toString(), userInfo.nmUser.toString())
  }
}
