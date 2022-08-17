import {Component, Inject, OnInit} from "@angular/core";
import {DialogButtonText} from "../../shared-models/enum/dialog-button-text";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ModelDialogConfirmation} from "./model-dialog-confirmation";

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
})
export class DialogConfirmationComponent implements OnInit {

  dialogButtonText = DialogButtonText;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModelDialogConfirmation
  ) {
  }
  ngOnInit(): void {
  }
}
