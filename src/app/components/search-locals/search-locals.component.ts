import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-locals',
  standalone: true,
  imports: [],
  templateUrl: './search-locals.component.html',
  styleUrl: './search-locals.component.scss'
})
export class SearchLocalsComponent implements OnInit{

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
    { id_local: 1, nm_local: "Teste 1", ds_adress: "Endereço Teste 1", ds_working_timeshift: "18:00 - 00:00" },
    { id_local: 1, nm_local: "Teste 1", ds_adress: "Endereço Teste 1", ds_working_timeshift: "18:00 - 00:00" },
    { id_local: 1, nm_local: "Teste 1", ds_adress: "Endereço Teste 1", ds_working_timeshift: "18:00 - 00:00" },
    { id_local: 1, nm_local: "Teste 1", ds_adress: "Endereço Teste 1", ds_working_timeshift: "18:00 - 00:00" },
    { id_local: 1, nm_local: "Teste 1", ds_adress: "Endereço Teste 1", ds_working_timeshift: "18:00 - 00:00" },
    { id_local: 1, nm_local: "Teste 1", ds_adress: "Endereço Teste 1", ds_working_timeshift: "18:00 - 00:00" },
    { id_local: 2, nm_local: "Teste 2", ds_adress: "Endereço Teste 2", ds_working_timeshift: "19:30 - 02:00" }
  ]

  ngOnInit(): void {
    this.cityList = [
      {
        id_city: 1, nm_city: "Santos"
      },
      {
        id_city: 2, nm_city: "São Vicente"
      }]

      this.tagsSelected.set(1, { id_tag: 1, nm_tag: "Chopperia", color_tag: "#e6b927" })
      this.tagsSelected.set(2, { id_tag: 2, nm_tag: "Música ao vivo", color_tag: "#a0a3a1"})
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
    this.tagsSelected.set(3, {id_tag: 3, nm_tag: "Hamburgueria", color_tag: "#065e2e"})
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

  getLocalAdditionalInfo(){
    console.log("Procurando informações adicionais - teste.")
  }

  saveLocalInUserFavorites() {
    console.log("Salvando local na lista de favoritos do usuário - teste.")
  }

}
