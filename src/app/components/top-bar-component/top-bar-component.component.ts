import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginViewService } from '../login-view/login-view-service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-top-bar-component',
  standalone: true,
  imports: [ ],
  providers: [ LoginViewService ],
  templateUrl: './top-bar-component.component.html',
  styleUrl: './top-bar-component.component.scss'
})
export class TopBarComponentComponent implements OnInit {

  activeSection: string = 'home';
  dropdownOpen: string | null = null;

  constructor(private router: Router, private loginService: LoginViewService, private dialogRef : MatDialog,){

  }

  ngOnInit(): void {
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  endSession(){
    const dialogRef = this.dialogRef.open(ModalConfirmComponent, 
      { 
        data : {
          message: "Deseja sair da conta?"
        }
      })

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) this.loginService.endSession()
    })
  }
}
