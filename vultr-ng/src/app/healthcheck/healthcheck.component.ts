import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../location';
import { HealthCheckService } from '../health-check.service';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-healthcheck',
	templateUrl: './healthcheck.component.html',
	styleUrls: ['./healthcheck.component.css']
})
export class HealthcheckComponent implements OnInit {
	@Input() ip: string;

	public isLoaded: boolean = false;
	public locations: Location[] = [];

	constructor(private healthCheckService: HealthCheckService) { }

	ngOnInit() {
		this.getLocations()
			.subscribe(_ => {
				this.isLoaded = true;
			});
	}

	getLocations(): Observable<string[]> {
		this.isLoaded = false;
		this.locations = [];

		return this.healthCheckService.getLocations()
			.pipe(tap(location_names => {
				location_names.forEach((location_name) => {
					this.locations.push(new Location({ 'name': location_name }));
				});
				this.isLoaded = true;
			}));
	}

	getHealth(location: Location): void {
		this.isLoaded = false;
		location.health = null;
		this.healthCheckService.getHealth(location, this.ip)
			.subscribe(health => {
				location.health = health;
				this.isLoaded = true;
			});
	}

	refresh(): void {
		this.getLocations()
			.subscribe(_ => {
				this.locations.forEach((location) => {
					this.getHealth(location);
				});
			});
	}
}
