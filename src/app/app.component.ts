import { Component, OnInit } from '@angular/core';
import { MockApiService, Role, RoleTypeEnum, User } from './mock-api.service';
import { rawData } from './raw-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  rawData: { name: string, email: string, role: string, status?: string, id?: string, userId?: string }[];

  constructor(
    private mockApi: MockApiService
  ){}

  ngOnInit(){
    this.loadRawData();
  }

  private loadRawData(){

    // get the rawData from the provided file
    this.rawData = rawData;
  }
  async clickSubmit() {

    var results: any[] = await Promise.all(this.rawData.map(async (dataRow): Promise<any> => {
      if (dataRow.status === 'OK') {
        return dataRow;
      }

      let user: any = await this.addNewUser(dataRow)
      if (typeof user === "string") {
        return { ...dataRow, status: user };
      }
      else {
        let role = await this.addNewRole(user, dataRow.role);

        if (typeof role === 'string') {
          return { ...dataRow, status: role };
        } else {
         await this.addNewPortfolio(role.userId);
          return { ...dataRow, status: 'OK' };
        }
      }
    }));

    this.rawData = results;
  }

  async addNewUser(dataRow: any): Promise<string | User> {
    return new Promise((resolve) => {
      this.mockApi.createUser(dataRow.name, dataRow.email).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err: any) => {
          resolve(err.toString());
        }
      )
    })
  }

  async addNewRole(user: User, role: string): Promise<string | Role> {
    return new Promise((resolve) => {
      this.mockApi.createRole(user.id, role as RoleTypeEnum).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err: any) => {
          resolve(err.toString());
        }
      )
    })
  }

  async addNewPortfolio(userId: string): Promise<string> {
    return new Promise((resolve) => {
      this.mockApi.createPortfolio(userId).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err: any) => {
          resolve(err.toString());
        }
      )
    })
  }


}
