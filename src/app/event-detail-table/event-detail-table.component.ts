import { Component, OnInit } from '@angular/core';
import { DetailEvents, SearchEvents } from '../schema/ticketMasterEvents';
import { MainService } from '../main.service';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from '../Modal.component';

@Component({
  selector: 'event-detail-table',
  templateUrl: './event-detail-table.component.html',
  styleUrls: ['./event-detail-table.component.scss']
})
export class EventDetailTableComponent implements OnInit {
	Header = ['Artist/Teams','Venue','Time','Category','Price Range','Ticket Status','Buy Ticket At','Seat Map'];
	currEvent: DetailEvents = new DetailEvents();
	dataSource: DetailEvents[];
	isDisplayed: boolean[] = [false,false,false,false,false,false,false];
	constructor(public service: MainService, private decimalPipe: DecimalPipe, public modalInitializer: NgbModal) {
		this.initEvent(this.service.selection.selected[0]); 
	}
	initEvent(event: SearchEvents) {
		if (event == undefined) return;
		if (event._embedded.attractions !== undefined && event._embedded.attractions.length > 0) {
			this.currEvent.Artist = "";
			for (let i = 0; i < event._embedded.attractions.length; i++) {
				this.currEvent.Artist += event._embedded.attractions[i].name + ' | ';
			}
			this.currEvent.Artist = this.currEvent.Artist.substring(0,this.currEvent.Artist.length - 3);
		}
		if (event._embedded.venues !== undefined && event._embedded.venues.length > 0) {
			this.currEvent.Venue = event._embedded.venues[0].name;
		}
		if (event.dates.start.localDate != undefined) {
			this.currEvent.Date = event.dates.start.localDate;
		}
		if (event.dates.start.localTime != undefined) {
			this.currEvent.Time = event.dates.start.localTime;
		}
		if (event.classifications[0].genre != undefined && event.classifications[0].segment != undefined) {
			this.currEvent.Category = event.classifications[0].segment.name + ' | ' + event.classifications[0].genre.name;
		} else if (event.classifications[0].genre != undefined) {
			this.currEvent.Category = event.classifications[0].genre.name;
		} else if (event.classifications[0].segment != undefined) {
			this.currEvent.Category = event.classifications[0].segment.name;
		} 
		if (event.priceRanges != undefined && event.priceRanges.length > 0) {
			if (event.priceRanges[0].max != undefined && event.priceRanges[0].min != undefined) {
				this.currEvent.Price = this.decimalPipe.transform(event.priceRanges[0].min) + ' ~ ' + this.decimalPipe.transform(event.priceRanges[0].max) + ' ' + event.priceRanges[0].currency;
			} else if (event.priceRanges[0].min != undefined) {
				this.currEvent.Price = this.decimalPipe.transform(event.priceRanges[0].min) + ' ' + event.priceRanges[0].currency;
			} else if (event.priceRanges[0].max != undefined) {
				this.currEvent.Price = this.decimalPipe.transform(event.priceRanges[0].max) + ' ' + event.priceRanges[0].currency;
			} 
		}
		if (event.dates.status != undefined && event.dates.status.code != undefined) {
			this.currEvent.Status = event.dates.status.code;
		}
		if (event.url != undefined) {
			this.currEvent.BuyTicketUrl = event.url;
		}
		if (event.seatmap != undefined && event.seatmap.staticUrl != undefined) {
			this.currEvent.SeatMapUrl = event.seatmap.staticUrl;
		}
		let header = new DetailEvents();
		header.Artist = this.currEvent.Artist === ""? this.Header[0]: null;
		this.dataSource = [this.currEvent];
		
	}
	countRow(id,eventStr) {
		if (eventStr === '') {
			return false;
		} 
		this.isDisplayed[id] = true;
		let count = 0;
		for (let i = 0; i <= id; i++) {
			count += this.isDisplayed[i]?1:0; 
		}
		if (count % 2 == 0) {
			return false;
		}
		return true;
	}
	ngOnInit() {
		this.service.selection.changed.subscribe(eventChanged => {
			this.initEvent(eventChanged.source.selected[0]);
		});
	}
	openSeatMapModal(SeatMapUrl:string) {
		const newModal = this.modalInitializer.open(ModalContent);
		newModal.componentInstance.imgHref = SeatMapUrl;
	}
}
