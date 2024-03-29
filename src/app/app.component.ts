import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponentComponent } from './components/top-bar-component/top-bar-component.component';
import { SearchLocalsComponent } from './components/search-locals/search-locals.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponentComponent, SearchLocalsComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ftf-frontend';
}
