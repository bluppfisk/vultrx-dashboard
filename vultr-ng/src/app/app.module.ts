import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BandwidthGraphComponent } from './bandwidth-graph/bandwidth-graph.component';
import { VultrService } from './vultr.service';
import { HealthCheckService } from './health-check.service';
import { HealthcheckComponent } from './healthcheck/healthcheck.component';


@NgModule({
  declarations: [
    AppComponent,
    BandwidthGraphComponent,
    HealthcheckComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
  	VultrService,
    HealthCheckService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
