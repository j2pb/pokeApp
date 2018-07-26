import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiProvider {

    constructor(private http: HttpClient) {

    }

    getPokemons(idOrName) {
        return this.http.get('https://pokeapi.co/api/v2/pokemon/' + idOrName);
    }
}
