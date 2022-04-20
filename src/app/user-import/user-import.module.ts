import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserImportComponent } from './user-import.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    UserImportComponent
  ],
  exports: [
    UserImportComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UserImportModule { }
