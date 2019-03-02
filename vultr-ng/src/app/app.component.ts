import { Component } from '@angular/core';
import { VultrService } from './vultr.service';
import { Info } from './info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title: string = 'Vultr X Dashboard';
  info: Info = new Info;
  isLoaded: boolean = false;
  currentIp: string;

  constructor(private vultrService: VultrService) { }

  ngOnInit() {
    this.getInfo();
  }

  changeCurrentIp(ip: string) {
    console.log(ip);
    this.currentIp = ip;
  }

  getInfo(): void {
    this.isLoaded = false;
    this.vultrService.getInfo()
      .subscribe(info => {
        this.info = info;
        this.currentIp = info.main_ip;
        this.isLoaded = true;
      });
  }

  refresh(): void {
    this.getInfo();
  }
}
