import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UserImportModule} from './user-import/user-import.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        UserImportModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
