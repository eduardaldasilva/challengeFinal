// Caso de Teste CF9.10 - POST - movieId e userId Inválidos

import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.one;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Preparar os dados de entrada iválidos
export function setup() {
    const body = {
        "movieId": ".",
        "userId": ".",
        "seatNumber": 10,
        "price": 50,
        "showtime": "2024-08-31T19:00:00Z"
    };
    
    return { requestBody: body };
}

// Post com os IDs errados
export default function (data) {
    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, data.requestBody);

   
    baseChecks.checkStatusCode(res, 400); 
    baseChecks.checkMovieId(res); 
    baseChecks.checkTicketId(res); 

    console.log(res.body);
    console.log(`Status Code: ${res.status}`);
}


