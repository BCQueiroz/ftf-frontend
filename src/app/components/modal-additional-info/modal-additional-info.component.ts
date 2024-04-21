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

  localInfo: LocalAdditionalInfo = new LocalAdditionalInfo()

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef : MatDialogRef<ModalAdditionalInfoComponent>) {
    this.localInfo = this.initializeLocalAdditionalInfo(data.localAdditionalInfo)
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close()
  }

  initializeLocalAdditionalInfo(info: any): LocalAdditionalInfo {
    var localAdditionalInfo = new LocalAdditionalInfo()
    localAdditionalInfo.nmLocal = Boolean(info.nmLocal) ? info.nmLocal : "-"
    localAdditionalInfo.dsLocal = Boolean(info.dsLocal) ? info.dsLocal : "-" 
    localAdditionalInfo.dsSite = Boolean(info.dsSite) ? info.dsSite : "-"
    localAdditionalInfo.dsPhone = Boolean(info.dsPhone) ? info.dsPhone : "-"
    localAdditionalInfo.dsAddress = Boolean(info.dsAddressComplement) ? info.dsAddressComplement : "-"
    localAdditionalInfo.dsAproxPrice = this.formatPriceRange(info.vlMinPriceAprox, info.vlMaxPriceAprox)
    localAdditionalInfo.tagList.push(...info.localAllTags)
    localAdditionalInfo.dsWorkdays.push(...this.formatWorkdays(info.localScheduleWork))
    return localAdditionalInfo
  }

  formatPriceRange(minPrice: string, maxPrice: string): string {
    if(Boolean(minPrice) && !Boolean(maxPrice)) return `À partir de R$${minPrice}`
    if(!Boolean(minPrice) && Boolean(maxPrice)) return `Até R$${maxPrice}`
    if(Boolean(minPrice) && Boolean(maxPrice)) return `Entre R$${minPrice} e R$${maxPrice}`
    if(!Boolean(minPrice) || !Boolean(maxPrice)) return "-"
    return "-"
  }

  formatWorkdays(infoWorkdays: Array<any>): Array<string> {
    var workdaysFormatted: Array<string> = []
    infoWorkdays.forEach((info: any) => {
      var nmDay = info.nmDay
      var timeShift = info.dhBeginDay.length != 0 && info.dhEndDay.length != 0 ? this.formatWorkshift(info.dhBeginDay, info.dhEndDay) : "Fechado"
      workdaysFormatted.push(`${nmDay}: ${timeShift}`)
    })
    return workdaysFormatted
  }

  formatWorkshift(dhBeginDay: string, dhEndDay: string): string {
    if(dhBeginDay == "-" && dhEndDay == "-") return "Aberto o dia todo"
    if(dhBeginDay == "-" && dhEndDay != "-") return `Até às ${dhEndDay}`
    if(dhBeginDay != "-" && dhEndDay == "-") return `A partir das ${dhBeginDay}`
    return `Das ${dhBeginDay} até às ${dhEndDay}`
  }
}