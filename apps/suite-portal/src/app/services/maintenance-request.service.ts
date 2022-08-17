import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MaintenanceRequest} from "@suiteportal/api-interfaces";
import {MaintenanceRequestDB} from "../../../../api/src/maintenance-request/maintenance-request.dao";
@Injectable({
  providedIn: 'root'
})

export class MaintenanceRequestService {

  env = environment;

  constructor(private httpClient: HttpClient) {
  }

  createMaintenanceRequest(body: MaintenanceRequest): Observable<any> {
    return this.httpClient.post<any>(this.env.api + "maintenance-requests", body, environment.httpOptions)
  }

  closeMaintenanceRequest(id: string): Observable<MaintenanceRequestDB> {
    return this.httpClient.put<MaintenanceRequestDB>(this.env.api + 'maintenance-requests/' + id + '/close', '');
  }

  getAllMaintenanceRequests(): Observable<MaintenanceRequestDB[]> {
    return this.httpClient.get<MaintenanceRequestDB[]>(this.env.api + "maintenance-requests/all-maintenance-requests" );
  }

}
