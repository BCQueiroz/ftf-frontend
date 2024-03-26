import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalTesteComponent } from '../modal-teste/modal-teste.component'

@Component({
  selector: 'app-search-locals',
  standalone: true,
  imports: [],
  templateUrl: './search-locals.component.html',
  styleUrl: './search-locals.component.scss'
})
export class SearchLocalsComponent implements OnInit {

  cityList = [
    { id_city: 0, nm_city: "" }
  ]

  periodSelected: string = ''; 
  periodOptions = [
    { label: 'Madrugada (00:01 - 6:00)', value: '1' },
    { label: 'Manhã (6:01 - 12:00)', value: '2' },
    { label: 'Tarde (12:01 - 18:00)', value: '3' },
    { label: 'Noite (18:01 - 00:00)', value: '4' }
  ];

  tagsSelected = new Map()

  totalResults = 3

  locals = [
    { id_local: 1, nm_local: "Everpub - Cervejaria Everbrew", ds_adress: "Endereço Teste 1", ds_working_timeshift: "18:00 - 00:00" },
    { id_local: 1, nm_local: "Teste 1", ds_adress: "Endereço Teste 1", ds_working_timeshift: "18:00 - 00:00" },
    { id_local: 1, nm_local: "Teste 1", ds_adress: "Endereço Teste 1", ds_working_timeshift: "18:00 - 00:00" },
    { id_local: 1, nm_local: "Teste 1", ds_adress: "Endereço Teste 1", ds_working_timeshift: "18:00 - 00:00" },
    { id_local: 1, nm_local: "Teste 1", ds_adress: "Endereço Teste 1", ds_working_timeshift: "18:00 - 00:00" },
    { id_local: 1, nm_local: "Teste 1", ds_adress: "Endereço Teste 1", ds_working_timeshift: "18:00 - 00:00" },
    { id_local: 2, nm_local: "Teste 2", ds_adress: "Endereço Teste 2", ds_working_timeshift: "19:30 - 02:00" }
  ]

  constructor(private dialogRef : MatDialog){}

  ngOnInit(): void {
    this.cityList = [
      {
        id_city: 1, nm_city: "Santos"
      },
      {
        id_city: 2, nm_city: "São Vicente"
      }]

      this.tagsSelected.set(1, { idTag: 1, nmTag: "Chopperia", cdColorTag: "#e6b927" })
      this.tagsSelected.set(2, { idTag: 2, nmTag: "Música ao vivo", cdColorTag: "#a0a3a1"})
  }

  onPeriodSelectorChange(event: Event) {
    const periodSelected = (event.target as HTMLSelectElement).value;
    console.log(periodSelected)
  }

  onCitySelectedChange(event: Event) {
    const citySelected = (event.target as HTMLSelectElement).value
    console.log(citySelected)
  }

  onTagSelectedClick(event: any) {
    if(event && event.id_tag)
    this.tagsSelected.delete(event.id_tag)
  }

  openTagListModal() {
    this.tagsSelected.set(3, {idTag: 3, nmTag: "Hamburgueria", cdColorTag: "#065e2e"})
  }

  clearTags(){
    this.tagsSelected.clear()
  }

  clearFilters(){
    this.clearTags()
  }

  searchLocals(){
    console.log("Pesquisando locais - teste.")
  }

  getLocalAdditionalInfo(localInfo: any){
    if(!localInfo) return 
    let workdays = [
      "Segunda: Fechado", "Terça: Das 18:00 até as 00:30", "Quarta: Das 18:00 até as 01:00", 
        "Quinta: Das 18:00 até as 01:00", "Sexta: Das 18:00 até as 02:00", "Sábado: Das 18:00 até as 02:00", 
        "Domingo: Das 18:00 até as 01:00"
    ]
    this.dialogRef.open(ModalTesteComponent, 
      { 
        data: {
          nmLocal: localInfo.nm_local,
          dsAddress: localInfo.ds_adress,
          tagList: Array.from(this.tagsSelected.values()),
          dsWorkdays: workdays
        }
      }
    )

    console.log("Procurando informações adicionais - teste.")
  }

  saveLocalInUserFavorites() {
    console.log("Salvando local na lista de favoritos do usuário - teste.")
  }
}
