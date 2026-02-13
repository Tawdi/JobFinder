import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JobsService {

  private http = inject(HttpClient);

  getJobs(apiName: keyof typeof environment.jobApis, options: any = {}) {
    const api = environment.jobApis[apiName];

    const endpoint = api.endpoints["list"] || api.endpoints["search"];
    const url = api.baseUrl + endpoint;

    let params = new HttpParams();

    if (api.authType === 'query' && api.params) {
      Object.entries(api.params).forEach(([key, value]) => {
        params = params.set(key, value);
      });
    }

    // User options (page, keyword, location…)
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.set(key, String(value));
      }
    });

    // 3. Headers
    let headers = new HttpHeaders();
    if (api.authType === 'headers' && api.headers) {
      Object.entries(api.headers).forEach(([key, value]) => {
        headers = headers.set(key, String(value));
      });
    }

    return this.http.get(url, { params, headers });
  }
}
