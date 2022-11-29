import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { TableReportComponent } from '../table-report/table-report.component';
import { MatDialogRef } from '@angular/material/dialog';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  constructor(private matDialog:MatDialog, private dialogRef: MatDialogRef<Dialog>){}

  showPasswordReport(){
    let password = (<HTMLInputElement>document.getElementById("password")!).value;
    (<HTMLInputElement>document.getElementById("password")!).setCustomValidity("");
      (<HTMLInputElement>document.getElementById("password")!).reportValidity();
    const md5 = new Md5();
    if(md5.appendStr(password).end() == "84892b91ef3bf9d216bbc6e88d74a77c"){
      this.dialogRef.close(true);
    }
    else{
      (<HTMLInputElement>document.getElementById("password")!).setCustomValidity("Incorrect password");
      (<HTMLInputElement>document.getElementById("password")!).reportValidity();
      (<HTMLInputElement>document.getElementById("password")!).setCustomValidity("");
      (<HTMLInputElement>document.getElementById("password")!).reportValidity();
    }
  }

  showDialog(){
    this.matDialog.open(TableDialogComponent,{
      width:'590px',
      height: '850px',
    });
  }

  showReport(){
    this.matDialog.open(TableReportComponent,{
      width:'1200px',
      height: '900px',
    });
  }
}
