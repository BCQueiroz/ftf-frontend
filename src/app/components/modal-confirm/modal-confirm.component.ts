import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss'
})
export class ModalConfirmComponent {

  message: string = ""

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef : MatDialogRef<any>){
    this.message = data.message
  }

  confirmLogout(){
    this.confirmAction(true)
  }

  negateLogout(){
    this.confirmAction(false)
  }

  confirmAction(isLogout: boolean){
    this.dialogRef.close(isLogout)
  }
}
