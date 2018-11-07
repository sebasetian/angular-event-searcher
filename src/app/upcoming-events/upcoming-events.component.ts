import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { VenueInfo, UpcomingEvent } from '../schema/ArtistTeamInfo';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { zoomInDownOnEnterAnimation,zoomOutUpOnLeaveAnimation } from 'angular-animations';
@Component({
  selector: 'upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
	animations: [
		trigger('fadeinout', [state('show',style({})),state('notShow',style({})),
			transition(':enter', [style({ height: 0, overflow: 'hidden', opacity: 0 }), animate('.3s ease-in-out', style({ height: '*', overflow: 'hidden', opacity: 1 }))]),
			transition(':leave', [style({ height: '*', overflow: 'hidden', opacity: 1 }), animate('.3s ease-in-out', style({ height: 0, overflow: 'hidden',opacity: 0 }))])
		]),
	]
})
export class UpcomingEventsComponent implements OnInit {
	
	rankings = ['Default','Event Name','Time','Artist','Type'];
	orders = ['Ascending','Descending'];
	currRanking:string;
	currOrder:string;
	showMore:boolean;
	isAniDisabled:boolean;
	showMoreOrLess:string;
	constructor(public service: MainService) { }
	shouldShow(index:number,showMore:boolean):boolean {
		return index < 5 || (index >= 5 && showMore);
	}
	ngOnInit() {
		this.currRanking = 'Default';
		this.currOrder = 'Ascending';
		this.showMore = false;
		this.showMoreOrLess = 'Show More';
		this.isAniDisabled = true;
		this.service.selection.changed.subscribe(changed => {
			if (!this.service.selection.isEmpty()) {
				this.service.initVenue();
				this.service.findUpcomingEvents(this.service.venue.name);
			}
			this.currRanking = 'Default';
			this.currOrder = 'Ascending';
			this.showMore = false;
			this.showMoreOrLess = 'Show More';
			this.isAniDisabled = true;
		})

	}
	sortData() {
		this.isAniDisabled = true;
		const data = this.service.sortedData.slice();
		if (this.currRanking === 'Default') {
			this.service.sortedData = this.service.upcomingEvents.slice();
			return;
		}
		this.service.sortedData = data.sort((a, b) => {
			const isAsc = this.currOrder === 'Ascending';
			switch (this.currRanking) {
				case 'Event Name': return this.compare(a.name, b.name,false, isAsc);
				case 'Time': return this.compare(a, b,true, isAsc);
				case 'Artist': return this.compare(a.artist, b.artist,false, isAsc);
				case 'Type': return this.compare(a.type, b.type,false, isAsc);
				default: return 0;
			}
		});
	}
	compare(a, b,isTime: boolean,isAsc: boolean):number {
		if (isTime) {
			let aTime = new Date(a.date + (a.time !== null? ("T" + a.time):""));
			let bTime = new Date(b.date + (b.time !== null ? ("T" + b.time) : ""));
			return (aTime.getTime() - bTime.getTime() > 0? 1 : -1) * (isAsc? 1: -1);
		}
		return (a > b? 1: -1) * (isAsc ? 1 : -1);
	}
	showSwitch() {
		this.isAniDisabled = false;
		this.showMore = !this.showMore;
		if (!this.showMore) {
			this.showMoreOrLess = 'Show Less';
		} else {
			this.showMoreOrLess = 'Show More';
		}
	}
}
