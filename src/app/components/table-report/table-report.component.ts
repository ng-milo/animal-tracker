import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.css']
})
export class TableReportComponent {
  constructor(private dialogRef: MatDialogRef<Dialog>) {
  }

  ngOnInit() {
  }

  checkInfo() {
    // Name
    let tmp:string = (<HTMLInputElement>document.getElementById("name")!).value.replace(/[^A-Za-z]+$/g, '');
    if(tmp != (<HTMLInputElement>document.getElementById("name")!).value){
      (<HTMLInputElement>document.getElementById("name")!).setCustomValidity("Please enter letters only")
    } 
    else{
      (<HTMLInputElement>document.getElementById("name")!).setCustomValidity("")
    }
    (<HTMLInputElement>document.getElementById("name")!).value = tmp;
    (<HTMLInputElement>document.getElementById("name")!).reportValidity();

    // Phone number
    // ????

    // Breed
    tmp = (<HTMLInputElement>document.getElementById("breed")!).value.replace(/[^A-Za-z]+$/g, '');
    if(tmp != (<HTMLInputElement>document.getElementById("breed")!).value){
      (<HTMLInputElement>document.getElementById("breed")!).setCustomValidity("Please enter letters only")
    } 
    else{
      (<HTMLInputElement>document.getElementById("breed")!).setCustomValidity("")
    }
    (<HTMLInputElement>document.getElementById("breed")!).value = tmp;
    (<HTMLInputElement>document.getElementById("breed")!).reportValidity();

    // pigId
    tmp = (<HTMLInputElement>document.getElementById("pigId")!).value.replace(/[^0-9]/g, '');
    if(tmp != (<HTMLInputElement>document.getElementById("pigId")!).value){
      (<HTMLInputElement>document.getElementById("pigId")!).setCustomValidity("Please enter numbers only")
    } 
    else{
      (<HTMLInputElement>document.getElementById("pigId")!).setCustomValidity("")
    }
    (<HTMLInputElement>document.getElementById("pigId")!).value = tmp;
    (<HTMLInputElement>document.getElementById("pigId")!).reportValidity();

    // nameLocation
    tmp = (<HTMLInputElement>document.getElementById("nameLocation")!).value.replace(/[^A-Za-z]+$/g, '');
    if(tmp != (<HTMLInputElement>document.getElementById("nameLocation")!).value){
      (<HTMLInputElement>document.getElementById("nameLocation")!).setCustomValidity("Please enter letters only")
    } 
    else{
      (<HTMLInputElement>document.getElementById("nameLocation")!).setCustomValidity("")
    }
    (<HTMLInputElement>document.getElementById("nameLocation")!).value = tmp;
    (<HTMLInputElement>document.getElementById("nameLocation")!).reportValidity();

    // longitude
    tmp = (<HTMLInputElement>document.getElementById("longitude")!).value.replace(/[^-.0-9]/g, '');
    tmp.replace(/^0[^.]/, '0');
    if (tmp.indexOf('-') == 0) {
      for (let i = 0; i<(<HTMLInputElement>document.getElementById("longitude")!).value.length; i++){
        tmp = tmp.replace('-', '');
      }
      tmp = '-' + tmp;
    }
    else{
      for (let i = 0; i<(<HTMLInputElement>document.getElementById("longitude")!).value.length; i++){
        tmp = tmp.replace('-', '');
      }
    }
    if (tmp.indexOf('.') != -1){ // There exists a decimal
        let count = 0;
        for (let i = 0; i<tmp.length; i++){
            if (tmp[i] == '.'){
                count += 1;
            }
        }
        if (count > 1){ // Repalces any other decimals
            // Reverse string to not mess up the first decimal
            let rev = tmp.split("").reverse().join("");
            for (let i = 0; i<count-1; i++){
                rev = rev.replace('.', '');
            }
            // Make the string back to the original
            tmp = rev.split("").reverse().join("");
        }
    }
    if (tmp != (<HTMLInputElement>document.getElementById("longitude")!).value || (parseFloat((<HTMLInputElement>document.getElementById("longitude")!).value)) == null) { // Display error message
      (<HTMLInputElement>document.getElementById("longitude")!).setCustomValidity("Please ensure input only contains numbers");
      (<HTMLInputElement>document.getElementById("longitude")!).value = tmp;
    }
    else {
      (<HTMLInputElement>document.getElementById("longitude")!).setCustomValidity("");
    }
    (<HTMLInputElement>document.getElementById("longitude")!).reportValidity();


    // latitude
    tmp = (<HTMLInputElement>document.getElementById("latitude")!).value.replace(/[^-.0-9]/g, '');
    tmp.replace(/^0[^.]/, '0');
    if (tmp.indexOf('-') == 0) {
      for (let i = 0; i<(<HTMLInputElement>document.getElementById("latitude")!).value.length; i++){
        tmp = tmp.replace('-', '');
      }
      tmp = '-' + tmp;
    }
    else{
      for (let i = 0; i<(<HTMLInputElement>document.getElementById("latitude")!).value.length; i++){
        tmp = tmp.replace('-', '');
      }
    }
    if (tmp.indexOf('.') != -1){ // There exists a decimal
        let count = 0;
        for (let i = 0; i<tmp.length; i++){
            if (tmp[i] == '.'){
                count += 1;
            }
        }
        if (count > 1){ // Repalces any other decimals
            // Reverse string to not mess up the first decimal
            let rev = tmp.split("").reverse().join("");
            for (let i = 0; i<count-1; i++){
                rev = rev.replace('.', '');
            }
            // Make the string back to the original
            tmp = rev.split("").reverse().join("");
        }
    }
    if (tmp != (<HTMLInputElement>document.getElementById("latitude")!).value || (parseFloat((<HTMLInputElement>document.getElementById("latitude")!).value)) == null) { // Display error message
      (<HTMLInputElement>document.getElementById("latitude")!).setCustomValidity("Please ensure input only contains numbers");
      (<HTMLInputElement>document.getElementById("latitude")!).value = tmp;
    }
    else {
      (<HTMLInputElement>document.getElementById("latitude")!).setCustomValidity("");
    }
    (<HTMLInputElement>document.getElementById("latitude")!).reportValidity();

    // Dont need anything for notes

    }

  submitInfo() {
    
    // (<HTMLInputElement>document.getElementById("name")!).value;
    // (<HTMLInputElement>document.getElementById("pNumber")!).value;
    // (<HTMLInputElement>document.getElementById("breed")!).value;
    // (<HTMLInputElement>document.getElementById("pigId")!).value;
    // (<HTMLInputElement>document.getElementById("nameLocation")!).value;
    // (<HTMLInputElement>document.getElementById("longitude")!).value;
    // (<HTMLInputElement>document.getElementById("latitude")!).value;
    // (<HTMLInputElement>document.getElementById("notes")!).value;

    this.checkInfo();
    // TODO: Implement saving information to database
    // Needs to save time, date, and status

    // Close the website
    this.dialogRef.close();
  }

}
