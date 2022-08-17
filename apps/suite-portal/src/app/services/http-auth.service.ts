import {Injectable} from "@angular/core";
import {AuthRequest} from "../../../../api/src/auth/models/auth-request";
import {Observable} from "rxjs";
import {AuthResponse} from "../../../../api/src/auth/models/auth-response";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {

  env = environment;

  constructor(private httpClient: HttpClient) {
  }

  login(body: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.env.api + 'auth/login', body, environment.httpOptions);
  }

}
