import {Component, OnInit} from "@angular/core";
import {MaintenanceRequestDB} from "../../../../../api/src/maintenance-request/maintenance-request.dao";
import {MaintenanceRequestService} from "../../../app/services/maintenance-request.service";
import {DialogService} from "../../../app/shared-helpers/dialog.service";
import {DialogButtonText} from "../../../app/shared-models/enum/dialog-button-text";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-list-all-requests',
  templateUrl: './list-all-requests.component.html',
  styleUrls: ['./list-all-requests.component.scss']
})
export class ListAllRequestsComponent implements OnInit {
  requests: MaintenanceRequestDB[] | undefined | null;

  colOpenRequests: string[] = [
    'name',
    'unitNumber',
    'serviceType',
    'summary',
    'submittedAt',
    'actions'
  ];
  colClosedRequests: string[] = [
    'name',
    'unitNumber',
    'serviceType',
    'summary',
    'submittedAt',
    'closedAt'
  ];

  openRequests: MaintenanceRequestDB[] = [];
  closedRequests: MaintenanceRequestDB[] = [];

  constructor(
    private maintenanceRequestService: MaintenanceRequestService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.loadAllRequests();
  }

  private loadAllRequests(): void {
    this.maintenanceRequestService.getAllMaintenanceRequests()
      .pipe(first())
      .subscribe(
        (response) => {
          this.openRequests = response.filter((x) => x.isClosed == false);
          this.closedRequests = response.filter((x) => x.isClosed == true);
        },
        (error) => {
          // @show error message
        },
        () => {}
      );
  }


  closeRequest(element: MaintenanceRequestDB) {

    /**
     * - show confirmation modal box
     * - show successful message
     * - remove element from open list
     * - push element to closed list
     */

    let msg = 'Are you sure you want to <b>close</b>' + ' Unit Number: ' + element.unitNumber + ' request?';
    this.dialogService.confirmation(msg).subscribe(
      (response) => {
        if(response === DialogButtonText.CONFIRM) {
          this.maintenanceRequestService.closeMaintenanceRequest(element.id)
            .pipe(first())
            .subscribe(
            (closeResponse) => {
              if (closeResponse) {
                this.loadAllRequests();
                this.dialogService.success('Successfully closed maintenance report');
              } else {
                // @show error message
              }
            },
            (error) => {
              // @server error message
            }
          )
        }
      }
    )
  }
}
