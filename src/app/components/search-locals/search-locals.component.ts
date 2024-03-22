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

  tagsSelected = [
    { id_tag: 1, nm_tag: "Chopperia", color_tag: "#e6b927" },
    { id_tag: 2, nm_tag: "Música ao vivo", color_tag: "#a0a3a1"}
  ]

  ngOnInit(): void {
    this.cityList = [
      {
        id_city: 1, nm_city: "Santos"
      },
      {
        id_city: 2, nm_city: "São Vicente"
      }]
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
    console.log("Exclusão de tag- teste.")
  }

  openTagListModal() {
    this.tagsSelected.push({id_tag: -1, nm_tag: "Hamburgueria", color_tag: "#065e2e"})
  }

  clearTags(){
    this.tagsSelected = []
  }

  clearFilters(){
    this.clearTags()
  }

  searchLocals(){
    console.log("Pesquisando locais - teste.")
  }

}
