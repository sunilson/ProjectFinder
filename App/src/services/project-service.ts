import { Observable } from 'rxjs/Observable';
import { StorageService } from './storage-service';
import { MapperService } from './mapper-service';
import { User } from './../data/User';
import { NetworkConstants } from './../data/constants/NetworkConstants';
import { Application } from './../data/Application';
import { HttpClient } from '@angular/common/http';
import { Project } from './../data/Project';
import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable()
export class ProjectService {

    constructor(private http: HttpClient,
        private mapperService: MapperService,
        private storageService: StorageService) {

    }

    getSingleProject(projectId: string) {

        let networkRequest = this.http.get(NetworkConstants.HOME_URL + '/projects/' + projectId).retry(3).flatMap((res) => {
            let project = this.mapperService.jsonToProject(res);
            return Observable.fromPromise(this.storageService.storeProject(project));
        });

        let localRequest = Observable.fromPromise(this.storageService.loadProject(projectId)).catch((error) => {
            return Observable.empty();
        });

        return Observable.merge(localRequest, networkRequest);
    }

    getSingleApplication(applicationId: string) {
        let networkRequest = this.http.get(NetworkConstants.HOME_URL + '/projects/applications/' + applicationId).retry(3).flatMap(
            (result) => {
                let application = this.mapperService.jsonToApplication(result);
                return Observable.fromPromise(this.storageService.storeApplication(application));
            });

        let localRequest = Observable.fromPromise(this.storageService.loadApplication(applicationId)).catch((error) => {
            return Observable.empty();
        });

        return Observable.merge(localRequest, networkRequest);
    }

    getInterestingProjects() {
        return new Promise((resolve, reject) => {
            this.http.get(NetworkConstants.HOME_URL + '/projects/interestingProjects').subscribe(
                (result: any) => {
                    let projects = this.mapperService.jsonToProjectArray(result);
                    let promises = [];
                    for (let project of projects) {
                        promises.push(this.storageService.storeProject(project));
                    }

                    Promise.all(promises).then(() => {
                        resolve(projects);
                    }).catch((e) => {
                        reject(e);
                    })
                },
                (error) => {
                    reject(error);
                });
        });
    }

    addProject(project: Project): Promise<Project> {
        return new Promise((resolve, reject) => {
            var body = {
                data: JSON.stringify(project)
            };
            this.http.post(NetworkConstants.HOME_URL + '/projects/new', body).subscribe((result: any) => {
                project.id = result["_id"];
                this.storageService.addOwnProjectToUser(project).then(() => {
                    resolve(result);
                }).catch(e => {
                    reject(e);
                });
            }, (error) => {
                reject(error);
            });
        });
    }

    removeProject(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(NetworkConstants.HOME_URL + '/projects/' + id, { responseType: "text" }).subscribe((result: any) => {
                this.storageService.removeProject(id).then(() => {
                    resolve();
                }).catch((error) => {
                    reject(error)
                });
            }, (error) => {
                reject(error);
            });
        });
    }

    editProject(project: Project) {

    }

    canApply(user: any, projectId: string) {
        if (user.applications) {
            for (let application of user.applications) {
                if (application.authorId == user.id && application.projectId == projectId) {
                    return application;
                }
            }
        }
        return null;
    }

    isMember(user: User, project: Project): boolean {
        for (let member of project.members) {
            if (user.id == member.id) return true;
        }

        return false;
    }

    sendApplication(application: Application) {

        var body = {
            data: JSON.stringify(application)
        }

        body.data = body.data.replace("projectId", "project");
        body.data = body.data.replace("author", "unimportant");
        body.data = body.data.replace("authorId", "author");

        return new Promise((resolve, reject) => {
            this.http.post(NetworkConstants.HOME_URL + '/projects/applications', body).subscribe(
                (result: any) => {
                    application["id"] = result.applicationId;
                    this.storageService.addApplication(application).then(() => {
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    });
                },
                (error) => {
                    reject(error);
                });
        });
    }

    changeApplicationStatus(id: string, projectID: string, userID: string, status: number): Promise<any> {

        let url = "";

        switch (status) {
            case 0:
                url = "deline/";
                break;
            case 2:
                url = "accept/";
                break;
            default:
                return;
        }

        return new Promise((resolve, reject) => {
            this.http.post(NetworkConstants.HOME_URL + '/projects/applications/' + url + id, null, { responseType: "text" }).subscribe((result) => {
                this.storageService.changeApplicationStatus(id, projectID, userID, status).then(() => {
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            }, (error) => {
                reject(error);
            });
        });
    }

    removeMember(userID: string, projectID: string, leaving: boolean) {
        return new Promise((resolve, reject) => {
            var body = { projectID: projectID, userID: userID };
            this.http.post(NetworkConstants.HOME_URL + '/projects/leave', body, { responseType: "text" }).subscribe(
                (result) => {
                    this.storageService.removeMemberFromProject(projectID, userID, leaving).then(() => {
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    });
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }

    closeProject(projectID: string) {
        return new Promise((resolve, reject) => {
            var body = { projectID: projectID };
            this.http.post(NetworkConstants.HOME_URL + '/projects/close', body, { responseType: "text" }).subscribe(
                (result) => {
                    this.storageService.closeProject(projectID).then(() => {
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    });
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }

    formateDate(date: string): string {
        moment.locale(navigator.language);
        return moment(date).format("L");
    }

    calculateDuration(date1: string, date2: string): string {
        let firstDate = moment(date1);
        let secondDate = moment(date2);

        let duration = moment.duration(secondDate.diff(firstDate));
        return Math.ceil(duration.asWeeks()).toString();
    }
}