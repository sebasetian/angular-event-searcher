import { Self } from "@angular/core";

export class formField {
	public distance: number;
	
	constructor(
	public keyword:string,
	public category:string,
	public distanceUnit:string,
	public fromWhere:string,
	public location:string,
	public lat: number,
	public lng: number
	){};
}