import { DatabaseService, Employee } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.page.html',
  styleUrls: ['./listview.page.scss'],
})
export class ListviewPage implements OnInit {

  // employee: Employee[] = [];

  // employees = {};

  constructor(
    //  public db: DatabaseService
     ) 
    {

   }

  ngOnInit() {
    // this.db.getDatabaseState().subscribe(rdy => {
    //   if (rdy) {
    //     this.db.getEmployees().subscribe(emp=> {
    //       this.employees = emp;
    //     })
    //   }
    // });
  }

}

