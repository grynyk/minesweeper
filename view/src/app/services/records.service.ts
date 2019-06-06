import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Record } from '../models/record';

@Injectable()
export class RecordsService {
    constructor(private httpClient: HttpClient) { }

    createRecord(record: Record) {
        return this.httpClient.post('/api/game/records', record);
    }

    getAllRecords() {
        return this.httpClient.get('/api/game/records').pipe(map(response => response));
    }
}
