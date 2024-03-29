import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocalAdditionalInfo } from '../../interfaces/localAdditionalInfo';

@Component({
  selector: 'app-modal-additional-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-additional-info.component.html',
  styleUrl: './modal-additional-info.component.scss'
})
export class ModalAdditionalInfoComponent implements OnInit{

  localInfo: LocalAdditionalInfo

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef : MatDialogRef<ModalAdditionalInfoComponent>) {
    this.localInfo = {
      nmLocal: data.nmLocal ? data.nmLocal : "-",
      dsPhone: data.dsPhone ? data.dsPhone : "-", 
      dsAddress: data.dsAddress ? data.dsAddress : "-",
      dsSite: data.dsSite ? data.dsSite : "-",
      dsAproxPrice: data.dsAproxPrice ? data.dsAproxPrice : "-",
      dsLocal: data.dsLocal ? data.dsLocal : "Sem descrição adicional",
      dsWorkdays: data.dsWorkdays ? data.dsWorkdays : [],
      tagList: data.tagList ? data.tagList : []
    }
  }

  ngOnInit(): void {
    console.log("Abriu")
  }

  closeModal() {
    this.dialogRef.close()
  }
}