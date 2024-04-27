
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalStorageManager } from "../utils/local-storage-manager";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class LoginViewService {

    private ambientUrl = 'https://ftf-search-ws.vercel.app/' // "http://localhost:3000/"
    private userEnvironment = `${this.ambientUrl}api/auth`
    private loginUrl = "/user-login"
    private timeoutSession: any
    private readonly TIMEOUT_DURATION = 300000 // 5 minutos

    constructor(private http: HttpClient, private localStorageManager: LocalStorageManager, private router: Router) { 
    }

    authenticateUser(email: string, password: string): Observable<any> {
        var bodyRequisition = {
            email, password
        }
        return this.http.post<any>(`${this.userEnvironment}${this.loginUrl}`, bodyRequisition)
    }

    endSession() {
        localStorage.clear()
        clearTimeout(this.timeoutSession);
        this.router.navigate(['/login'])
    }

    startSession(idUser: string, nmUser: string) {
        this.localStorageManager.setLocalStorageValue("isLogged", "true")
        this.localStorageManager.setLocalStorageValue("idUser", idUser)
        this.localStorageManager.setLocalStorageValue("nmUser", nmUser)
        this.startTimeoutSession()
        this.router.navigate(['/logged-area'])
    }

    private startTimeoutSession() {
        this.timeoutSession = setTimeout(() => {
          //this.endSession()
          console.log('Usuário deslogado devido à inatividade.');
        }, this.TIMEOUT_DURATION);
    }

    resetTimeoutSession() {
        clearTimeout(this.timeoutSession);
        this.startTimeoutSession();
    }
}