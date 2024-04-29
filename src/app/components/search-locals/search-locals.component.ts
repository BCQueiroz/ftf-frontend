import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAdditionalInfoComponent } from '../modal-additional-info/modal-additional-info.component';
import { ModalTagListComponent } from '../modal-tag-list/modal-tag-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchLocalsService } from '../../services/search-locals-service';
import { TagTypeInfo } from '../../interfaces/tagTypeInfo';
import { TagInfo } from '../../interfaces/tagInfo';
import { CityInfo } from '../../interfaces/cityInfo';
import { LocalInfo } from '../../interfaces/localInfo';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip'
import { TooltipInformation } from '../../utils/tooltip-information';
import { FormsModule } from '@angular/forms';
import { SavedLocalsService } from '../../services/saved-locals-service';
import { LocalStorageManager } from '../../utils/local-storage-manager';

@Component({
  selector: 'app-search-locals',
  standalone: true,
  imports: [ HttpClientModule, MatTooltipModule, FormsModule ],
  providers :  [ SearchLocalsService, SavedLocalsService, LocalStorageManager ],
  templateUrl: './search-locals.component.html',
  styleUrl: './search-locals.component.scss'
})
export class SearchLocalsComponent implements OnInit {

  cityList: Array<CityInfo> = []
  periodOptions = [
    { label: 'Qualquer Período', idPeriod: 0 },
    { label: 'Madrugada (00:01 - 6:00)', idPeriod: 1 },
    { label: 'Manhã (6:01 - 12:00)', idPeriod: 2 },
    { label: 'Tarde (12:01 - 18:00)', idPeriod: 3 },
    { label: 'Noite (18:01 - 00:00)', idPeriod: 4 }
  ];
  tagListByType: Array<TagTypeInfo> = []

  citySelected: number = 0
  periodSelected: number = 0; 
  tagsSelected: Map<number, TagInfo> = new Map()

  totalResults = 0
  locals: Array<LocalInfo> = []
  tooltipsInformations = new TooltipInformation()

  constructor(private dialogRef : MatDialog, 
              private http: HttpClient, 
              private searchService: SearchLocalsService,
              private savedLocalsService: SavedLocalsService,
              private localStorageManager: LocalStorageManager){
  }

  async ngOnInit(): Promise<void> {
    await this.searchService.getAllTags().subscribe(
      (response) => {
        this.initializeTagList(response.result.tags)
      }
    )

    await this.searchService.getAllCities().subscribe(
      (response) => {
        this.initializeCitiesList(response.result.cities)
      }
    )
  }

  async searchLocals(){
    const idPeriodSelected = Boolean(this.periodSelected) && this.periodSelected != 0 ? this.periodSelected : null
    const idCitySelected = Boolean(this.citySelected) && this.citySelected != 0 ? this.citySelected : null
    const tagsSelected = Array.from(this.tagsSelected.keys())
    const idUser = this.localStorageManager.getLocalStorageValue("idUser")

    await this.searchService.searchLocals(idPeriodSelected, idCitySelected, tagsSelected, Number(idUser)).subscribe(
      (response) => {
        if(response.result && response.result.locals) this.initializeLocalInfo(response.result.locals)
      }
    )
  }

  onPeriodSelectorChange(event: Event) {
    const periodSelected = (event.target as HTMLSelectElement).value;
    if(Boolean(periodSelected)) this.periodSelected = Number(periodSelected)
  }

  onCitySelectedChange(event: Event) {
    const citySelected = (event.target as HTMLSelectElement).value
    if(Boolean(citySelected)) this.citySelected = Number(citySelected)
  }

  onTagSelectedClick(event: any) {
    if(event && event.idTag) {
      this.tagsSelected.delete(event.idTag)
      this.tagListByType.forEach(item => {
        item.tagList.forEach(tag => {
          if(event.idTag == tag.idTag) tag.isSelected = false
        })
      })
    }
  }

  initializeCitiesList(cityList: Array<any>){
    var cities: Array<CityInfo> = []
    cityList.forEach( (city: any) => {
      var cityInfo = new CityInfo()
      cityInfo.idCity = city.idCity
      cityInfo.nmCity = city.nmCity + " - " + city.cdAcronym
      cityInfo.cdAcronym = city.cdAcronym
      cities.push(cityInfo)
    })
    var cityInfoDefault = new CityInfo()
    cityInfoDefault.idCity = 0
    cityInfoDefault.nmCity = "Qualquer Cidade"

    this.cityList.push(cityInfoDefault)
    this.cityList.push(...cities)
    this.citySelected = this.cityList.length != 0 ? this.cityList[0].idCity : 0
  }

  initializeTagList(tagList: Array<any>){
    var tagTypeList: Array<TagTypeInfo> = []
    tagList.forEach((tagType: any) => {
      var newTagType: TagTypeInfo = new TagTypeInfo()
      newTagType.idTypeTag = tagType.idTypeTag
      newTagType.dsTypeTag = tagType.dsTypeTag
      newTagType.cdColorTypeTag = "#" + tagType.cdColorTypeTag

      tagType.tagList.forEach((tag:any) => {
        var newTag: TagInfo = new TagInfo()
        newTag.idTag = tag.idTag
        newTag.dsTag = tag.dsTag
        newTag.cdColorTag = "#" + tagType.cdColorTypeTag
        newTag.isSelected = false
        newTagType.tagList.push(newTag)
      })
      tagTypeList.push(newTagType)
    });
    this.tagListByType.push(...tagTypeList)
  }

  initializeLocalInfo(locals: Array<any>){
    this.locals = []
    var localsList: Array<LocalInfo> = []
    locals.forEach((local: any) => {
      var localInfo = new LocalInfo()
      localInfo.idLocal = local.idLocal
      localInfo.nmLocal = local.nmLocal
      localInfo.nmAddress = local.nmAddress
      localInfo.cdNumberAddress = local.cdNumberAddress
      localInfo.nmCity = local.nmCity
      localInfo.dhBeginDay = local.dhBeginDay
      localInfo.dhEndDay = local.dhEndDay
      localInfo.dsWorkshift = this.formatWorkshift(local.dhBeginDay, local.dhEndDay)
      localsList.push(localInfo)
    })
    this.locals.push(...localsList)
    this.totalResults = this.locals.length
  }

  formatWorkshift(dhBeginDay: string, dhEndDay: string): string {
    if(dhBeginDay == "-" && dhEndDay == "-") return "Aberto o dia todo"
    if(dhBeginDay == "-" && dhEndDay != "-") return `Até às ${dhEndDay}`
    if(dhBeginDay != "-" && dhEndDay == "-") return `A partir das ${dhBeginDay}`
    return `Das ${dhBeginDay} até às ${dhEndDay}`
  }

  async openModalAdditionalInfo(localInfo: any){
    if(!localInfo) return 

    this.searchService.getLocalAdditionalInfo(localInfo.idLocal).subscribe(
      (localAdditionalInfo) => {

        this.dialogRef.open(ModalAdditionalInfoComponent, 
          { 
            data: {
              localAdditionalInfo: localAdditionalInfo.result.localAdditionalInfo
            }
          }
        )
      },
    )
  }

  openTagListModal() {
    const dialogRefModal = this.dialogRef.open(ModalTagListComponent, 
      {
        data: {
          tagList: this.tagListByType,
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
    this.tagListByType.forEach(it => {
      it.tagList.forEach(tag => {
        tag.isSelected = false
      })
    })
    this.tagsSelected.clear()
  }

  clearFilters(){
    this.clearTags()
  }

  async saveLocalInUserFavorites(localInfo: any) {
    if(!localInfo.idLocal) return
    const idLocal = localInfo.idLocal
    const idUser = this.localStorageManager.getLocalStorageValue("idUser")
    if(!Boolean(idUser)) return
    
    await this.savedLocalsService.saveNewLocalInUserList(Number(idUser), idLocal).subscribe(
      (response) => {}
    )
  }
}
