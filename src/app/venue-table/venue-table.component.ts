///<reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { VenueInfo } from '../schema/ArtistTeamInfo';
import { MainService } from '../main.service';

@Component({
  selector: 'venue-table',
  templateUrl: './venue-table.component.html',
  styleUrls: ['./venue-table.component.scss']
})
export class VenueTableComponent implements OnInit {
	@ViewChild('map') mapElement: any;
	Header = ['Address','City','Phone Number','Open Hours','General Rule','Child Rule'];
	isDisplayed:boolean[] = [false,false,false,false,false,false];
	constructor(public service:MainService) { }
	countRow(id, str) {
		if (str === '') {
			return false;
		}
		this.isDisplayed[id] = true;
		let count = 0;
		for (let i = 0; i <= id; i++) {
			count += this.isDisplayed[i] ? 1 : 0;
		}
		if (count % 2 == 0) {
			return false;
		}
		return true;
	}
	initMap() {
		 this.service.findGeoLocation(this.service.venue.address).subscribe(geo => {
			if (geo !== null) {
				let map = new google.maps.Map(
					this.mapElement.nativeElement, {center: new google.maps.LatLng(geo.lat, geo.lng), zoom:15});
				let marker = new google.maps.Marker({position: new google.maps.LatLng(geo.lat, geo.lng), map: map});
			} 
		})	
	}
	ngOnInit() {
		this.service.venue = new VenueInfo();
		if(!this.service.selection.isEmpty()) {
			this.service.initVenue();
			this.initMap();
		}
		this.service.selection.changed.subscribe(changed => {
			if (!this.service.selection.isEmpty()) {
				this.service.initVenue();
				this.initMap();
			}
		})
	}

}
