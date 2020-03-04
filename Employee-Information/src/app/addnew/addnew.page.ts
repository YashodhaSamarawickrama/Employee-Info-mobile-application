import { Component, OnInit } from '@angular/core';
import {Employee} from '../models/employee';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.page.html',
  styleUrls: ['./addnew.page.scss'],
})
export class AddnewPage implements OnInit {

  data:Employee;

  constructor(
    public apiService: ApiService,
    public router: Router
  ) 
  
  {
    this.data = new Employee();
  }
 

  ngOnInit() {
  }
  submitForm() {
    this.apiService.createEmployee(this.data).subscribe((response) => {
      this.router.navigate(['list']);
    });
 

}
