import { Component, OnInit } from '@angular/core';
import { LocalStorageManager } from '../../utils/local-storage-manager';

@Component({
  selector: 'app-home-area',
  standalone: true,
  imports: [ ],
  providers: [ LocalStorageManager ],
  templateUrl: './home-area.component.html',
  styleUrl: './home-area.component.scss'
})
export class HomeAreaComponent implements OnInit {

  userNameParam = ''

  ngOnInit(): void {
    const nmUser = this.localStorageManager.getLocalStorageValue("nmUser")
    if(Boolean(nmUser)) this.userNameParam = `, ${nmUser}`
  }

  constructor(private localStorageManager: LocalStorageManager){}

}
