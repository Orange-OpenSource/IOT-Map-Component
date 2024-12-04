import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';

@Component({
    selector: 'app-root',
    imports: [MapComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';
}
