import { Component, OnInit } from '@angular/core';
import { SavedLocalsService } from '../../services/saved-locals-service';
import { LocalStorageManager } from '../../utils/local-storage-manager';
import { LocalInfo } from '../../interfaces/localInfo';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip'
import { SearchLocalsService } from '../../services/search-locals-service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAdditionalInfoComponent } from '../modal-additional-info/modal-additional-info.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { TooltipInformation } from '../../utils/tooltip-information';

@Component({
  selector: 'app-saved-locals',
  standalone: true,
  imports: [ MatTooltipModule ],
  providers: [ SavedLocalsService, LocalStorageManager, SearchLocalsService ],
  templateUrl: './saved-locals.component.html',
  styleUrl: './saved-locals.component.scss'
})
export class SavedLocalsComponent implements OnInit {

  userSavedLocals: Array<LocalInfo> = []
  totalResults = 0
  tooltipInformation = new TooltipInformation()

  async ngOnInit(): Promise<void> {
    this.totalResults = 0
    await this.getUserLocalsSaved()
  }

  constructor(private savedLocalsService: SavedLocalsService, 
              private localStorageManager: LocalStorageManager,
              private searchService: SearchLocalsService,
              private dialogRef : MatDialog,){}

  async getUserLocalsSaved(){
    console.log("teste")
    const idUser = this.localStorageManager.getLocalStorageValue("idUser")
    if(!Boolean(idUser)) return

    await this.savedLocalsService.getUserLocalsSaved(Number(idUser)).subscribe(
      (response) => {
        if(response && response.result && response.result.localsSaved) this.initializeLocalInfo(response.result.localsSaved)
      }
    )
  }

  initializeLocalInfo(locals: Array<any>){
    this.userSavedLocals = []
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
    this.userSavedLocals.push(...localsList)
    this.totalResults = this.userSavedLocals.length
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

  async removeSavedLocal(localInfo: any){
    const idUser = this.localStorageManager.getLocalStorageValue("idUser")
    if(!Boolean(idUser) || !Boolean(localInfo.idLocal)) return

    const dialogRef = this.dialogRef.open(ModalConfirmComponent, 
      { 
        data : {
          message: "Deseja remover este local dos favoritos?"
        }
      })

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      console.log(result)
      if(result) {
        await this.savedLocalsService.removeItemFromUserSavedLocals(Number(idUser), localInfo.idLocal).subscribe(
          async (response) => {
            await this.getUserLocalsSaved()
          }
        )
      }
    })
  }
}
