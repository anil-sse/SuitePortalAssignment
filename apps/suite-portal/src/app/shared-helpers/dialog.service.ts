import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogSuccessComponent} from "./dialog-success/dialog-success.component";
import {ModelDialogConfirmation} from "./dialog-confirmation/model-dialog-confirmation";
import {Observable} from "rxjs";
import {DialogConfirmationComponent} from "./dialog-confirmation/dialog-confirmation.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  success(message: string = ''): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = message;
    dialogConfig.panelClass = 'min-width-50vw';
    this.dialog.open(DialogSuccessComponent, dialogConfig);
  }

  confirmation(message: string, isBtnYesNo: boolean = false): Observable<string> {

    const model: ModelDialogConfirmation = {
      isYesNo: isBtnYesNo, // @further to add more options
      message: message
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = model;
    dialogConfig.panelClass = 'min-width-50vw';
    return this.dialog.open(DialogConfirmationComponent, dialogConfig).afterClosed();
  }
}
