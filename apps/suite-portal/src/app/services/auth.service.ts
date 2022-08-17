import {Injectable} from "@angular/core";
import {HttpAuthService} from "./http-auth.service";
import {AuthRequest} from "../../../../api/src/auth/models/auth-request";
import {first} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {AuthResponse} from "../../../../api/src/auth/models/auth-response";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser: string;

  sessAccessToken = environment.sessionAccessToken;

  constructor(private httpAuthService: HttpAuthService, private router: Router) {
  }

  login(request: AuthRequest) {
    this.removeJwtSessionStorage();
    this.httpAuthService.login(request)
      .pipe(first())
      .subscribe((response) => {
        this.loggedInUser = response.username;
        this.setJwtSessionStorage(response);
        this.router.navigate(['/admin/maintenance-requests']).then();
      }),
      (error) => { }
  }

  logout(): void {
    this.removeJwtSessionStorage();
    this.router.navigate(['/login']).then();
  }

  setJwtSessionStorage(response: AuthResponse): void {
    this.removeJwtSessionStorage();
    sessionStorage.setItem(this.sessAccessToken, response.accessToken);
  }
  getJwtAccessToken(): any {
    return sessionStorage.getItem(this.sessAccessToken);
  }
  removeJwtSessionStorage(): void {
    sessionStorage.removeItem(this.sessAccessToken);
  }

}
