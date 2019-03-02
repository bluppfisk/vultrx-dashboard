import { Component, OnInit } from '@angular/core';
import { VultrService } from '../vultr.service';
import { Usage } from '../usage';

const GB: number = 1073741824;

@Component({
  selector: 'app-bandwidth-graph',
  templateUrl: './bandwidth-graph.component.html',
  styleUrls: ['./bandwidth-graph.component.css']
})

export class BandwidthGraphComponent implements OnInit {
  public isLoaded: boolean = false;
  public usage: Usage = new Usage();

  constructor(private vultrService: VultrService) { }

  ngOnInit() {
    this.getUsage();
  }

  getUsage(): void {
    this.isLoaded = false;
    this.vultrService.getUsage()
      .subscribe(usage => {
        this.usage = usage,
          this.isLoaded = true
      });
  }

  refresh(): void {
    this.getUsage();
  }

  getPct(raw: number, max: number): number {
    return (raw / max) * 100;
  }

  getGB(raw: number): string {
    return (raw / GB).toFixed(2) + ' GB';
  }

  getDay(date: string): string {
    return date.split('-')[2];
  }

}
