import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "../../../../open/account/shared/token.service";

enum ImageStatus {
  Upload,
  Loading,
  Uploaded
}

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService{

  constructor(private http:HttpClient, private tokenService: TokenService) { }

  private getAuthorizationToken() {
    const token = this.tokenService.getToken();
    return token;
  }

  get imageStatus(): ImageStatus { return this._imageStatus; }
  set imageStatus(value: ImageStatus) { this._imageStatus = value;}

  public imgSta = ImageStatus
  private _imageStatus: ImageStatus = ImageStatus.Upload

  get imageURL(): string { return this._imageURL; }
  set imageURL(value: string) { this._imageURL = value; }

  private _imageURL!: string
  baseURL: string = "http://localhost:8080"

  addImage(file: File, id_animal: any): Observable<Object> {
    var reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    const formData = new FormData();
    formData.append("imageFile", file)

    return this.http.post(this.baseURL + "/upload/"+id_animal, formData, {headers: reqHeader})
  }

}
