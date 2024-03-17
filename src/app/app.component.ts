import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponentComponent } from './components/top-bar-component/top-bar-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ftf-frontend';
}
