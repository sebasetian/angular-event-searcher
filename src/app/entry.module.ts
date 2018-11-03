import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { PropagationStopModule } from 'ngx-propagation-stop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { MainComponent } from './main.component';
import { ResultComponent } from './result/result.component';
import { SlideComponent } from './slide/slide.component';
import { FavoriteTableComponent } from './favorite-table/favorite-table.component';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import { MainService } from './main.service';
import { EventDetailTableComponent } from './event-detail-table/event-detail-table.component';
import { ArtistDetailTableComponent } from './artist-detail-table/artist-detail-table.component';
import { ArtistDetailTableWrapperComponent } from './artist-detail-table-wrapper/artist-detail-table-wrapper.component';
import { DecimalPipe } from '@angular/common';
import { VenueTableComponent } from './venue-table/venue-table.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component'
@NgModule({
	declarations: [
		MainComponent,
		ResultComponent,
		SlideComponent,
		FavoriteTableComponent,
		DetailInfoComponent,
		EventDetailTableComponent,
		ArtistDetailTableComponent,
		ArtistDetailTableWrapperComponent,
		VenueTableComponent,
		UpcomingEventsComponent
	],
	imports: [
		FormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatToolbarModule,
		MatInputModule,
		MatTableModule,
		ReactiveFormsModule,
		HttpClientModule, 
		PropagationStopModule,
		NgbModule,
		MatDividerModule,
		MatListModule,
		RoundProgressModule,
		MatGridListModule,
		MatCardModule
	],
	providers: [MainService,DecimalPipe],
	entryComponents: [
		ArtistDetailTableComponent
	],
	bootstrap: [MainComponent]
})
export class EntryModule { }
