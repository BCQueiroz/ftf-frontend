import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LocalAdditionalInfo } from '../../interfaces/localAdditionalInfo';

@Component({
  selector: 'app-modal-teste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-teste.component.html',
  styleUrl: './modal-teste.component.scss'
})
export class ModalTesteComponent implements OnInit{

  localInfo: LocalAdditionalInfo

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef : MatDialog) {
    console.log(data)
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
    this.dialogRef.closeAll()
  }

}
