import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    BrowserModule,
    MapRoutingModule
  ],
  providers: [],
  bootstrap: [MapComponent]
})
export class MapModule { }
