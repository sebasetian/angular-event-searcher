import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MainComponent } from './main.component';
import { MainService } from './main.service';
import { HttpClientModule } from  '@angular/common/http';
import { ResultComponent } from './result/result.component';
import { SlideComponent } from './slide/slide.component';

@NgModule({
	declarations: [
		MainComponent,
		ResultComponent,
		SlideComponent
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
		HttpClientModule
	],
	providers: [MainService],
	bootstrap: [MainComponent]
})
export class EntryModule { }
