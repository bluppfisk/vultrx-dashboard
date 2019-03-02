import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Info } from './info';
import { Usage } from './usage';

@Injectable()
export class VultrService {

  private vultrUrl = 'https://blaap.be/vultrx/index.php';

  constructor(private http: HttpClient) { }

  getInfo(): Observable<Info> {
    return this.http.get<Info>(this.vultrUrl + '?action=basic');
  }

  getUsage(): Observable<Usage> {
    return this.http.get<Usage>(this.vultrUrl + '?action=bandwidth');
  }

}