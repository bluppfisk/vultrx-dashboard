import { Health } from './health';

export class Location {
	health: Health;
	name: string;

	public constructor(init?:Partial<Location>) {
		Object.assign(this, init);
	}
}