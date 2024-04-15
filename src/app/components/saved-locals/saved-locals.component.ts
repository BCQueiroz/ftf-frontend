import { Component, OnInit } from '@angular/core';
import { SavedLocalsService } from '../../services/saved-locals-service';
import { LocalStorageManager } from '../../utils/local-storage-manager';
import { response } from 'express';

@Component({
  selector: 'app-saved-locals',
  standalone: true,
  imports: [],
  providers: [ SavedLocalsService, LocalStorageManager ],
  templateUrl: './saved-locals.component.html',
  styleUrl: './saved-locals.component.scss'
})
export class SavedLocalsComponent implements OnInit {

  userSavedLocals: any

  async ngOnInit(): Promise<void> {
    await this.getUserLocalsSaved()
  }

  constructor(private savedLocalsService: SavedLocalsService, private localStorageManager: LocalStorageManager){}

  async getUserLocalsSaved(){
    const idUser = this.localStorageManager.getLocalStorageValue("idUser")
    if(!Boolean(idUser)) return

    await this.savedLocalsService.getUserLocalsSaved(Number(idUser)).subscribe(
      (response) => {
        console.log(response)
      }
    )
  }

}
