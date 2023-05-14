import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(
    private _apiService: ApiService
  ) { }

  getStories(searchText) {
    const url = `${API_ENDPOINTS.STORIES}?tags=story&query=${searchText}`;
    return this._apiService.get(url);
  }
}
