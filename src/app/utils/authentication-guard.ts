import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageManager } from "./local-storage-manager";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard {

    constructor(private router: Router, private localStorageManager: LocalStorageManager) {}

    canActivate() {
        const isLogged = this.localStorageManager.getLocalStorageValue("isLogged")
        if(Boolean(isLogged)){
            return true
        } else {
            this.router.navigate(['login'])
            return false
        }
    }

}