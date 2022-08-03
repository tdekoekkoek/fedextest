import { Injectable } from '@angular/core';
import { LoginCriteria, LoginResult } from "./auth.model";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginCriteria: LoginCriteria): Observable<LoginResult> {
    const url = 'https://demo-api.now.sh/users';
    return this.http.post(url, loginCriteria)
      .pipe(
        map((result: any) => {
          return {
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            id: result._id,
            loggedIn: true
          }
        })
      )
  }

}
