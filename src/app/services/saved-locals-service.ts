import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SavedLocalsService {

    private savedLocalsUrl = `http://localhost:3000/api/saved`
    private saveLocalInUserListApi = 'save-new-local-by-user'
    private getUserLocalsSavedApi = 'get-locals-saved-by-user'
    private removeItemFromUserSavedLocalsApi = 'remove-item-from-saved-locals'

    constructor(private httpClient: HttpClient){

    }

    saveNewLocalInUserList(idUser: number, idLocal: number): Observable<any> {
        var bodyRequisition = {
            idUser: idUser,
            idLocal: idLocal
        }
        return this.httpClient.post<any>(`${this.savedLocalsUrl}/${this.saveLocalInUserListApi}`, bodyRequisition)
    }

    getUserLocalsSaved(idUser: number): Observable<any>{
        var bodyRequisition = {
            idUser: idUser
        }
        return this.httpClient.post<any>(`${this.savedLocalsUrl}/${this.getUserLocalsSavedApi}`, bodyRequisition)
    }

    removeItemFromUserSavedLocals(idUser: number, idLocal: number): Observable<any> {
        var bodyRequisition = {
            idUser: idUser,
            idLocal: idLocal
        }
        return this.httpClient.post<any>(`${this.savedLocalsUrl}/${this.removeItemFromUserSavedLocalsApi}`, bodyRequisition)
    }
}