import {HttpHeaders} from "@angular/common/http";

export const environment = {
  production: true,
  sessionAccessToken: '__PRO_SUITE_ACCESS__',
  api: "",
  httpOptions: { headers: new HttpHeaders({'Content-Type': 'application/json'})}
};
