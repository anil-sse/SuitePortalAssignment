import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {ListAllRequestsComponent} from "./ms-listing/list-all-requests/list-all-requests.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AdminRoutingModule} from "./admin-routing.module";
import {SharedModule} from "../app/shared.module";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [AdminComponent, ListAllRequestsComponent],
    imports: [
        CommonModule,
        RouterModule,
        AdminRoutingModule,
        SharedModule,
        MatTabsModule

    ]
})
export class AdminModule { }
