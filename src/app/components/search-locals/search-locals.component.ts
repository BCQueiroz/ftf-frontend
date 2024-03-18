import { Component } from '@angular/core';

@Component({
  selector: 'app-search-locals',
  standalone: true,
  imports: [],
  templateUrl: './search-locals.component.html',
  styleUrl: './search-locals.component.scss'
})
export class SearchLocalsComponent {

  periodSelected: string = ''; 
  periodOptions = [
    { label: 'Madrugada (00:01 - 6:00)', value: '1' },
    { label: 'Manhã (6:01 - 12:00)', value: '2' },
    { label: 'Tarde (12:01 - 18:00)', value: '3' },
    { label: 'Noite (18:01 - 00:00)', value: '4' }
  ];

  onPeriodSelectorChange(event: Event) {
    const valorSelecionado = (event.target as HTMLSelectElement).value;
    console.log(valorSelecionado)
  }

}
