import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { VenueInfo, UpcomingEvent } from '../schema/ArtistTeamInfo';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { zoomInDownOnEnterAnimation,zoomOutUpOnLeaveAnimation } from 'angular-animations';
@Component({
  selector: 'upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
	animations: [
		zoomInDownOnEnterAnimation(),
		zoomOutUpOnLeaveAnimation(),
		trigger('fadeinout', [
			// ...
			state('showed', style({
				transform: 'scale(1.0)'
			})),
			state('notShowed', style({
				padding:0,
				margin:0,
				transform: 'scale(0.0)'
			})),
			transition('showed => notShowed', [
				animate('0.5s ease-in')
			]),
			transition('notshowed => Showed', [
				animate('0.5s ease-out')
			])
		]),
	]
})
export class UpcomingEventsComponent implements OnInit {
	
	rankings = ['Default','Event Name','Time','Artist','Type'];
	orders = ['Ascending','Descending'];
	currRanking:string;
	currOrder:string;
	showMore:boolean;
	showMoreOrLess:string;
	constructor(private service: MainService) { }
	shouldShow(index:number,showMore:boolean):boolean {
		return index < 5 || (index >= 5 && showMore);
	}
	ngOnInit() {
		this.currRanking = 'Default';
		this.currOrder = 'Ascending';
		this.showMore = false;
		this.showMoreOrLess = 'Show More';
		this.service.selection.changed.subscribe(changed => {
			if (!this.service.selection.isEmpty()) {
				this.service.initVenue();
				this.service.findUpcomingEvents(this.service.venue.name);
			}
			this.currRanking = 'Default';
			this.currOrder = 'Ascending';
			this.showMore = false;
			this.showMoreOrLess = 'Show More';
		})

	}
	sortData() {
		const data = this.service.sortedData.slice();
		if (this.currRanking === 'Default') {
			this.service.sortedData = data;
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
		this.showMore = !this.showMore;
		if (this.showMore) {
			this.showMoreOrLess = 'Show Less';
		} else {
			this.showMoreOrLess = 'Show More';
		}
	}
}
