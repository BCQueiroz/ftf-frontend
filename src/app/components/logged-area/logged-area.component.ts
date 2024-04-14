import { Component, OnInit } from '@angular/core';
import { TopBarComponentComponent } from '../top-bar-component/top-bar-component.component';
import { SearchLocalsComponent } from '../search-locals/search-locals.component';

@Component({
  selector: 'app-logged-area',
  standalone: true,
  imports: [ TopBarComponentComponent, SearchLocalsComponent ],
  templateUrl: './logged-area.component.html',
  styleUrl: './logged-area.component.scss'
})
export class LoggedAreaComponent implements OnInit{

  isHomePage = true
  actualPage: string = ''

  ngOnInit(){
    this.actualPage = 'home'
  }

  changePageView(newPageView: string){
    console.log(newPageView)
    this.actualPage = newPageView
  }
}
