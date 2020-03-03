import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Employee {
  empid: number,
  Name: string,
  Gender : string,
  Address: string
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
    return this.database.executeSql('SELECT * FROM employee', []).then(data => {
      let employees: Employee[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
            employees.push({ 
            empid: data.rows.item(i).empid,
            Name: data.rows.item(i).Name, 
            Gender: data.rows.item(i).Gender, 
            Address: data.rows.item(i).Address, 
           });
        }
      }
      this.employees.next(employees);
    });
  }
 
  addEmployee(name,gender, address) {
    let data = [name,gender,address];
    return this.database.executeSql('INSERT INTO employee(Name, Gender, Address) VALUES (?, ?, ?)', data).then(data => {
      this.loadEmployees();
    });
  }
 
  getEmployee(empid): Promise<Employee> {
    return this.database.executeSql('SELECT * FROM employee WHERE empid = ?', [empid]).then(data => {
     
      return {
        empid: data.rows.item(0).empid,
        Name: data.rows.item(0).Name, 
        Gender: data.rows.item(0).Gender,
        Address : data.rows.item(0).Address 
      }
    });
  }
 
  deleteEmployee(empid) {
    return this.database.executeSql('DELETE FROM employee WHERE empid = ?', [empid]).then(_ => {
      this.loadEmployees();
    });
  }
 
  updateEmployee(employee: Employee) {
    let data = [employee.Name, employee.Gender,employee.Address];
    return this.database.executeSql(`UPDATE employee SET Name = ?, Gender = ?, Address = ? WHERE empid = ${employee.empid}`, data).then(data => {
      this.loadEmployees();
    })
  }
}
