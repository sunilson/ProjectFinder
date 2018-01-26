import { MapperService } from './mapper-service';
import { StorageService } from './storage-service';
import { Project } from './../data/Project';
import { NetworkConstants } from './../data/constants/NetworkConstants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SearchSettings } from './../data/SearchSettings';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchService {

    public searchSettings: SearchSettings = new SearchSettings();
    private searchSettingsSource = new Subject<SearchSettings>();
    private searchSettingsObservable: Observable<SearchSettings> = this.searchSettingsSource.asObservable();

    constructor(private http: HttpClient, private storageService: StorageService,
        private mapperService: MapperService) {
    }

    updateSearchSettings(key, value) {
        this.searchSettings[key] = value;
        this.searchSettingsSource.next(this.searchSettings);
    }

    getSearchSettings(): Observable<SearchSettings> {
        return this.searchSettingsObservable;
    }

    clearSettings(): void {
        this.searchSettings = new SearchSettings();
    }

    startSearch(searchSettings: SearchSettings, page?: number): Promise<Project[]> {
        return new Promise((resolve, reject) => {
            var query = "";

            if (searchSettings.query) {
                query += "&query=" + searchSettings.query;
            }

            if (searchSettings.location) {
                query += "&lat=" + searchSettings.location.coordinates[0];
                query += "&lng=" + searchSettings.location.coordinates[1];
            }

            if (searchSettings.tags && searchSettings.tags.length > 0) {
                for (let tag of searchSettings.tags) {
                    query += "&tags=" + tag.id;
                }
            }

            if (searchSettings.paid) {
                query += "&paid=paid";
            }

            if (page) {
                query += "&page=" + page;
            }

            this.http.get(NetworkConstants.HOME_URL + "/projects/search?" + query).subscribe((result: any) => {
                let projects: Project[] = [];

                if (result && result.length > 0) {
                    result.forEach(element => {
                        let tempProject = this.mapperService.jsonToProject(element);
                        this.storageService.storeProject(tempProject);
                        projects.push(tempProject);
                    });
                }

                resolve(projects);
            }, (error) => {
                reject(error);
            });
        });
    }
}