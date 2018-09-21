import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Observable } from 'rxjs';

@Injectable()
export class jobLocationMapService {
    jobLocations: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    selectedLocations: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    getJobLocations(): Observable<any[]> {
        return this.jobLocations.asObservable();
    }

    getSelectedLocations(): Observable<any[]> {
        return this.selectedLocations.asObservable();
    }

    setJobLocations(jobLocations: any[]) {
        this.jobLocations.next(jobLocations);
    }

    setSelectedLocations(jobLocations: any[]) {
        this.selectedLocations.next(jobLocations);
    }

    constructor() {
    }

}
