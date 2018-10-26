import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main.component';
import { MainService } from './main.service';
import { HttpClientModule } from  '@angular/common/http';

@NgModule({
	declarations: [
		MainComponent
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
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [MainService],
	bootstrap: [MainComponent]
})
export class EntryModule { }
