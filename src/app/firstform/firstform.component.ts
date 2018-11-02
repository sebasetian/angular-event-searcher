import { Component, OnInit } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule ,FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';





@Component({
  selector: 'app-firstform',
  templateUrl: './firstform.component.html',
  styleUrls: ['./firstform.component.scss']
})
export class FirstFormComponent implements OnInit{

	myForm: FormGroup;
	keyword: string = "";
	//myFrom = this.Formbuild.group({
  	//	keyword: ['',Validators.required],
  	//	category: ['dafault'],
  	//	distance: ['10'],
  	//	dunit: [''],
  	//	from: [''],
  	//	specifiedlocation: ['']
  	//})

	//Ctr: FormControl = new FormControl();
	//myFrom = new FormGroup({
	//	keyword: new FormControl(''),
	//	category:  new FormControl(''),
	//	distance:  new FormControl(''),
	//	dunit: new FormControl(''),
	//	from:  new FormControl(''),
	//	specifiedlocation: new FormControl(''),
	//});
	public submited: boolean = false;


  constructor(private Formbuild : FormBuilder) { 
  }

  ngOnInit(){
  	this.myForm = this.Formbuild.group({
  		keyword: [' '],
  		category: ['dafault'],
  		distance: ['10'],
  		dunit: [' '],
  		from: [' '],
  		specifiedlocation:[' ']
  	})

  	//this.myForm.valueChange.subscribe(console.log)

  }

}
