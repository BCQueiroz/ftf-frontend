import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SearchLocalsService {

    //private ambientUrl = process.env["AMBIENTE_URL"] ? process.env["AMBIENTE_URL"] : "http://localhost:3000/"
    private searchUrl = `http://localhost:3000/api/search`
    private getCitiesUrl = "get-all-cities"
    private getTagsUrl = "get-all-tags"
    private getLocalsUrl = "search-locals"
    private getLocalAdditionalInfoUrl = "get-local-additional-info"

    constructor(private http: HttpClient) { 
    }

    getMockTags(): Observable<any> {
        return this.http.get<any>('assets/tags-mock.json');
    }

    getAllTags(): Observable<any> {
        return this.http.get<any>(`${this.searchUrl}/${this.getTagsUrl}`)
    }

    getAllCities(): Observable<any> {
        return this.http.get<any>(`${this.searchUrl}/${this.getCitiesUrl}`)
    }

    searchLocals(idPeriod: any, idCity: any, idTagList: Array<number>, idUser: number): Observable<any> {
        var bodyRequisition = {
            idPeriod, idCity, idTagList, idUser
        }
        return this.http.post<any>(`${this.searchUrl}/${this.getLocalsUrl}`, bodyRequisition)
    }

    getLocalAdditionalInfo(idLocal: number): Observable<any> {
        var bodyRequisition = {
            idLocal
        }
        return this.http.post<any>(`${this.searchUrl}/${this.getLocalAdditionalInfoUrl}`, bodyRequisition)
    }

}