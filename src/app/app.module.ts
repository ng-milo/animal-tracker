import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { TableComponent } from './components/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableDialogComponent } from './components/table-dialog/table-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import { TableReportComponent } from './components/table-report/table-report.component';
import { PigComponent } from './components/pig/pig.component'
import { SearchPipe } from './search.pipe';
import { PasswordComponent } from './components/password/password.component';
import { PasswordReportComponent } from './components/password-report/password-report.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PopupComponent } from './components/popup/popup.component'

import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    TableComponent,
    TableDialogComponent,
    TableReportComponent,
    SearchPipe,
    PigComponent,
    PasswordComponent,
    PasswordReportComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
