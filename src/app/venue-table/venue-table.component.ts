import { Component, OnInit } from '@angular/core';
import { VenueInfo } from '../schema/ArtistTeamInfo';
import { MainService } from '../main.service';

@Component({
  selector: 'venue-table',
  templateUrl: './venue-table.component.html',
  styleUrls: ['./venue-table.component.scss']
})
export class VenueTableComponent implements OnInit {
	venue: VenueInfo;
	Header = ['Address','City','Phone Number','Open Hours','General Rule','Child Rule'];
	isDisplayed:boolean[] = [false,false,false,false,false,false];
	constructor(private service:MainService) { }
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
	ngOnInit() {
		this.venue = new VenueInfo();
		if(!this.service.selection.isEmpty()) {
			let event = this.service.selection.selected[0];
			if (event._embedded.venues !== undefined && event._embedded.venues.length > 0) {
				let currVenue = event._embedded.venues[0];
				if (currVenue.address !== undefined) this.venue.address = currVenue.address.line1;
				this.venue.city = "";
				if (currVenue.city !== undefined && currVenue.state !== undefined) this.venue.city = currVenue.city.name + ',' + currVenue.state.name;
				else if (currVenue.city !== undefined) this.venue.city = currVenue.city.name;
				else if (currVenue.state !== undefined) this.venue.city = currVenue.state.name;

				if (currVenue.boxOfficeInfo !== undefined) {
					if (currVenue.boxOfficeInfo.phoneNumberDetail !== undefined) this.venue.phone = currVenue.boxOfficeInfo.phoneNumberDetail;
					if (currVenue.boxOfficeInfo.openHoursDetail !== undefined) this.venue.open = currVenue.boxOfficeInfo.openHoursDetail;
				}

				if (currVenue.generalInfo !== undefined) {
					if (currVenue.generalInfo.generalRule !== undefined) this.venue.rule = currVenue.generalInfo.generalRule;
					if (currVenue.generalInfo.childRule !== undefined) this.venue.child = currVenue.generalInfo.childRule;
				} 
			}
		}
		this.service.selection.changed.subscribe(changed => {
			if (!this.service.selection.isEmpty()) {
				let event = this.service.selection.selected[0];
				if (event._embedded.venues !== undefined && event._embedded.venues.length > 0) {
					let currVenue = event._embedded.venues[0];
					if (currVenue.address !== undefined) this.venue.address = currVenue.address.line1;
					this.venue.city = "";
					if (currVenue.city !== undefined && currVenue.state !== undefined) this.venue.city = currVenue.city.name + ',' + currVenue.state.name;
					else if (currVenue.city !== undefined) this.venue.city = currVenue.city.name;
					else if (currVenue.state !== undefined) this.venue.city = currVenue.state.name;

					if (currVenue.boxOfficeInfo !== undefined) {
						if (currVenue.boxOfficeInfo.phoneNumberDetail !== undefined) this.venue.phone = currVenue.boxOfficeInfo.phoneNumberDetail;
						if (currVenue.boxOfficeInfo.openHoursDetail !== undefined) this.venue.open = currVenue.boxOfficeInfo.openHoursDetail;
					}

					if (currVenue.generalInfo !== undefined) {
						if (currVenue.generalInfo.generalRule !== undefined) this.venue.rule = currVenue.generalInfo.generalRule;
						if (currVenue.generalInfo.childRule !== undefined) this.venue.child = currVenue.generalInfo.childRule;
					}
				}
			}
		})
	}

}
