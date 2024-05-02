import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-alert',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './modal-alert.component.html',
  styleUrl: './modal-alert.component.scss'
})
export class ModalAlertComponent {

  message: string = ""

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef : MatDialogRef<any>){
    this.message = data.message
  }

  confirmAction(){
    this.dialogRef.close()
  }

}
