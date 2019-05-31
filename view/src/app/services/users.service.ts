import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {
    constructor(private httpClient: HttpClient) { }

    createUser(user:User) {
        return this.httpClient.post('/api/users/register', user);
    }

    getMyData() {
        return this.httpClient.get('/api/users/getMyData').pipe(map(response => response));
    }
}
