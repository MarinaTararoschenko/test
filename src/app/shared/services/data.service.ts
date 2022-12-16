import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface ParkingMeter {
    id: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class TestDataService {

    constructor(private http: HttpClient) {
    }

    public getJSON(): Observable<any> {
        return this.http.get('/assets/test-data.json');
    }

    public postData(data: ParkingMeter[]): any {
        return this.http.post('/assets/test-data.json', data);
    }

    public getById(id: number): Observable<ParkingMeter> {
        return this.http.get<ParkingMeter>(`/assets/${id}.json`)
            .pipe(
                map((post: ParkingMeter) => {
                    return { ...post, id }
                })
            );
    }
}
