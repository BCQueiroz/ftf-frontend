import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SearchLocalsService {

    constructor(private http: HttpClient) { 
    }

    getMockTags(): Observable<any>{
        return this.http.get<any>('assets/tags-mock.json');
    }

}