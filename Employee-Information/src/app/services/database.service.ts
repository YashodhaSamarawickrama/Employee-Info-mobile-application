import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Employee {
  eid: number,
  name: string,
  gender : string,
  address: string
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  employees = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'employees.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  
   }
   seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadEmployees();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }
 
  getDatabaseState() {
    return this.dbReady.asObservable();
  }
 
  getEmployees(): Observable<Employee[]> {
    return this.employees.asObservable();
  }
  loadEmployees() {
    return this.database.executeSql('SELECT * FROM developer', []).then(data => {
      let employees: Employee[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let skills = [];
          if (data.rows.item(i).skills != '') {
            skills = JSON.parse(data.rows.item(i).skills);
          }
 
            employees.push({ 
            eid: data.rows.item(i).eid,
            name: data.rows.item(i).name, 
            gender: data.rows.item(i).gender, 
            address: data.rows.item(i).address, 
           });
        }
      }
      this.employees.next(employees);
    });
  }
 
  addEmployee(name,gender, address) {
    let data = [name,gender,address];
    return this.database.executeSql('INSERT INTO employee (name, gender, address) VALUES (?, ?, ?)', data).then(data => {
      this.loadEmployees();
    });
  }
 
  getEmployee(eid): Promise<Employee> {
    return this.database.executeSql('SELECT * FROM employee WHERE eid = ?', [eid]).then(data => {
     
      return {
        eid: data.rows.item(0).eid,
        name: data.rows.item(0).name, 
        gender: data.rows.item(0).gender,
        address : data.rows.item(0).address 
      }
    });
  }
 
  deleteEmployee(eid) {
    return this.database.executeSql('DELETE FROM employee WHERE eid = ?', [eid]).then(_ => {
      this.loadEmployees();
    });
  }
 
  updateDeveloper(employee: Employee) {
    let data = [employee.name, employee.gender,employee.address];
    return this.database.executeSql(`UPDATE employee SET name = ?, gender = ?, address = ? WHERE eid = ${employee.eid}`, data).then(data => {
      this.loadEmployees();
    })
  }
}
