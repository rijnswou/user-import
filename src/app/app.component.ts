import { Component, OnInit } from '@angular/core';
import { rawData } from './raw-data';
import { MockApiService } from './mock-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  rawData: {name: string, email: string, role: string}[];

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

  clickSubmit(){

    // this is probably not right
    for(let dataRow of this.rawData){
      this.mockApi.createUser(dataRow.name, dataRow.email).subscribe();
    }
    
  }

}
