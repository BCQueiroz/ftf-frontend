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
      nmLocal: data.localInfoProcessed && data.localInfoProcessed.nmLocal ? data.localInfoProcessed.nmLocal : "-",
      dsPhone: data.localInfoProcessed && data.localInfoProcessed.dsPhone ? data.localAdditionalInfo.dsPhone : "-", 
      dsAddress: data.localInfoProcessed && data.localInfoProcessed.dsAddress ? data.localInfoProcessed.dsAddress : "-",
      dsSite: data.localInfoProcessed && data.localInfoProcessed.dsSite ? data.localInfoProcessed.dsSite : "-",
      dsAproxPrice: data.localInfoProcessed && data.localInfoProcessed.dsAproxPrice ? data.localInfoProcessed.dsAproxPrice : "-",
      dsLocal: data.localInfoProcessed && data.localInfoProcessed.dsLocal ? data.localInfoProcessed.dsLocal : "Sem descrição adicional",
      dsWorkdays: data.localInfoProcessed && data.localInfoProcessed.dsWorkdays ? data.localInfoProcessed.dsWorkdays : [],
      tagList: data.localInfoProcessed && data.localInfoProcessed.tagList ? data.localInfoProcessed.tagList : []
    }
  }

  ngOnInit(): void {
    console.log("Abriu")
  }

  closeModal() {
    this.dialogRef.closeAll()
  }

}
