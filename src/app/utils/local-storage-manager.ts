import { isPlatformBrowser } from "@angular/common";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class LocalStorageManager {

    constructor(@Inject(PLATFORM_ID) private platformId: Object){}

    getLocalStorageValue(key: string){
        if(isPlatformBrowser(this.platformId)){
            return localStorage.getItem(key)
        }
        return null
    }

    setLocalStorageValue(key: string, value: string){
        if(isPlatformBrowser(this.platformId)){
            localStorage.setItem(key, value)
        }
    }
}