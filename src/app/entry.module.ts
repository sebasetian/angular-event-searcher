import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MainComponent } from './main.component';
import { MainService } from './main.service';
import { HttpClientModule } from  '@angular/common/http';
import { ResultComponent } from './result/result.component';

@NgModule({
	declarations: [
		MainComponent,
		ResultComponent
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
