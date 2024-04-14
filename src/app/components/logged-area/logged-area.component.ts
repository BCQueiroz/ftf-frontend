import { Component } from '@angular/core';
import { TopBarComponentComponent } from '../top-bar-component/top-bar-component.component';
import { SearchLocalsComponent } from '../search-locals/search-locals.component';

@Component({
  selector: 'app-logged-area',
  standalone: true,
  imports: [ TopBarComponentComponent, SearchLocalsComponent ],
  templateUrl: './logged-area.component.html',
  styleUrl: './logged-area.component.scss'
})
export class LoggedAreaComponent {

  isHomePage = true

  changePageView(){
    
  }

}
