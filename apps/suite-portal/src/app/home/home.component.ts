import { Component, OnInit } from '@angular/core';
import {ALL_SERVICE_TYPES, MaintenanceRequest} from '@suiteportal/api-interfaces';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaintenanceRequestService} from "../services/maintenance-request.service";
import {DialogService} from "../shared-helpers/dialog.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  serviceTypes = ALL_SERVICE_TYPES;
  form: FormGroup;
  msPrefix = 'MS';
  constructor(
    public maintenanceRequestService: MaintenanceRequestService,
    public dialogService: DialogService,
    private authService: AuthService) {
    //
  }

  ngOnInit(): void {
    this.authService.removeJwtSessionStorage();
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      unitNumber: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      serviceType: new FormControl('', Validators.required),
      summary: new FormControl('', Validators.required),
      details: new FormControl('')
    });
  }

  submit(): void {

    if (this.form.valid) {
      // @ts-ignore
      const body: MaintenanceRequest = this.form.value;
      this.maintenanceRequestService.createMaintenanceRequest(body).subscribe(
        (response) => {
          if (response) {
            const output = response.id;
            this.dialogService.success('Successfully saved <br> Request Number: ' +  this.msPrefix + response.id.toUpperCase());

            this.form.reset();
            for (let controlsKey in this.form.controls) {
              this.form.controls[controlsKey].markAsPending();
              this.form.controls[controlsKey].markAsUntouched();
            }
            this.form.updateValueAndValidity();

          }
        },
        (error) => {},
        () => {}
      );
    }
    else {
      // @show invalid modal box
    }

  }

}
