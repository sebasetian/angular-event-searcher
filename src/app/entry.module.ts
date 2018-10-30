import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { PropagationStopModule } from 'ngx-propagation-stop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainComponent } from './main.component';
import { ResultComponent } from './result/result.component';
import { SlideComponent } from './slide/slide.component';
import { FavoriteTableComponent } from './favorite-table/favorite-table.component';
import { DetailInfoComponent } from './detail-info/detail-info.component';

import { MainService } from './main.service';

@NgModule({
	declarations: [
		MainComponent,
		ResultComponent,
		SlideComponent,
		FavoriteTableComponent,
		DetailInfoComponent
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
		NgbModule
	],
	providers: [MainService],
	bootstrap: [MainComponent]
})
export class EntryModule { }
