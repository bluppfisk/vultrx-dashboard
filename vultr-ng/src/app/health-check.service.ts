import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Health } from './health';
import { Location } from './location';

@Injectable()
export class HealthCheckService {

  constructor(private http: HttpClient) { }

  private healthCheckUrl = "https://blaap.be/vultrx/index.php";

  getLocations(): Observable<string[]> {
    return this.http.get<string[]>(this.healthCheckUrl + "?action=getLocations");
  }

  getHealth(location: Location, ip: string): Observable<Health> {
    return this.http.get<Health>(this.healthCheckUrl + "?action=check&location=" + location.name + "&ip=" + ip);
  }

}
