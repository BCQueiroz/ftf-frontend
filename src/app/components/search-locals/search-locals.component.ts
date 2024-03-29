import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAdditionalInfoComponent } from '../modal-additional-info/modal-additional-info.component';
import { ModalTagListComponent } from '../modal-tag-list/modal-tag-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchLocalsService } from './search-locals-service';
import { TagTypeInfo } from '../../interfaces/tagTypeInfo';
import { TagInfo } from '../../interfaces/tagInfo';

@Component({
  selector: 'app-search-locals',
  standalone: true,
  imports: [ HttpClientModule ],
  providers :  [SearchLocalsService ],
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

  tagListByType: any
  tagsSelected: Map<number, TagInfo> = new Map()

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

  constructor(private dialogRef : MatDialog, private http: HttpClient, private searchService: SearchLocalsService){}

  ngOnInit(): void {
    this.cityList = [
      {
        id_city: 1, nm_city: "Santos"
      },
      {
        id_city: 2, nm_city: "São Vicente"
      }]

      this.searchService.getMockTags().subscribe(
        (response) => {
          this.tagListByType = response
        }
      )
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
    if(event && event.idTag)
    this.tagsSelected.delete(event.idTag)
  }

  openModalAdditionalInfo(localInfo: any){
    if(!localInfo) return 
    let workdays = [
      "Segunda: Fechado", "Terça: Das 18:00 até as 00:30", "Quarta: Das 18:00 até as 01:00", 
        "Quinta: Das 18:00 até as 01:00", "Sexta: Das 18:00 até as 02:00", "Sábado: Das 18:00 até as 02:00", 
        "Domingo: Das 18:00 até as 01:00"
    ]
    this.dialogRef.open(ModalAdditionalInfoComponent, 
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

  openTagListModal() {
    console.log(this.tagsSelected)
    this.tagListByType.result.tags.forEach((element: any) => {
      element.tagList.forEach((tag:any) => {
        tag.isSelected = false
      })
    });
    
    const dialogRefModal = this.dialogRef.open(ModalTagListComponent, 
      {
        data: {
          tagList: this.tagListByType.result.tags,
        }
      }
    )

    dialogRefModal.afterClosed().subscribe((result:Array<TagInfo>) => {
      this.addNewTags(result)
    })
  }

  async addNewTags(tagListToAdd: Array<TagInfo>) {
    tagListToAdd.forEach(async tag => {
      if(!this.tagsSelected.has(tag.idTag)){
        await this.tagsSelected.set(tag.idTag, { idTag: tag.idTag, dsTag: tag.dsTag, cdColorTag: tag.cdColorTag, isSelected: true})
      }
    })
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

  

  saveLocalInUserFavorites() {
    console.log("Salvando local na lista de favoritos do usuário - teste.")
  }
}
