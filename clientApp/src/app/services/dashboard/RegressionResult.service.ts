import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { IRegressionResult } from './interfaces/IRegressionResult';
import { Configuration } from './app.constants';

@Injectable()
export class RegressionResultService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http) {

        this.actionUrl = Configuration.baseUrls.server +
            Configuration.baseUrls.apiUrl +
            'RegressionResults/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public GetAll = ( _filter: any): Observable<IRegressionResult[]> => {

        let filter = "";
        if ( _filter && _filter.length > 0 ) {
            filter = "?filter=" + encodeURIComponent(_filter);
        }         

        return this._http.get(this.actionUrl + filter)
            .map((response: Response) => <IRegressionResult[]>response.json())
            .catch(this.handleError);
    }

    public GetBuildNumbers = (groupName: string): Observable<IRegressionResult[]> => {
        
        groupName = "?groupName=" + encodeURIComponent(groupName);
        return this._http.get(this.actionUrl + 'getBuildNumbers' + groupName)
            .map((response: Response) => <IRegressionResult[]>response.json())
            .catch(this.handleError);
    }

    public GetSingle = (id: number): Observable<IRegressionResult> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <IRegressionResult>response.json())
            .catch(this.handleError);
    }

    public Add = (itemName: string): Observable<IRegressionResult> => {
        let toAdd = JSON.stringify({ ItemName: itemName });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <IRegressionResult>response.json())
            .catch(this.handleError);
    }

    public Update = (id: number, itemToUpdate: IRegressionResult): Observable<IRegressionResult> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map((response: Response) => <IRegressionResult>response.json())
            .catch(this.handleError);
    }

    public Delete = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}