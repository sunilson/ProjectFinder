import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RefreshService {

    private userChange: Subject<any> = new Subject();
    public refreshObservable: Observable<any> = this.userChange.asObservable();

    constructor() {

    }

    public refresh(data: any) {
        this.userChange.next(data);
    }

}