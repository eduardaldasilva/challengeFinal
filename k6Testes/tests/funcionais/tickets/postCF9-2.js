// Caso de Teste CF9.1 - POST - Criar ticket com assento inválido

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.one;
const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const tickets = new SharedArray('tickets', function () {
    return JSON.parse(open('../../../data/dynamic/tickets.json'));
});

// Criando ticket:
    
    export default function (data) {
        const payload = {
            "movieId": "string",
            "userId": "string",
            "seatNumber": 65, 
            "price": 60,
            "showtime": "2024-08-31T19:00:00Z"
          }
        const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, payload);

    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkMovieId(res);
    baseChecks.checkPrice(res);
    baseChecks.checkshowtime(res);
    baseChecks.checkAssento(res);
    baseChecks.checkTicketId(res);
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 

    const payload1 = {
        "movieId": "string",
        "userId": "string",
        "seatNumber": 66, 
        "price": 0,
        "showtime": "2024-08-31T19:00:00Z"
      }
    const res1 = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, payload1);

    baseChecks.checkStatusCode(res1, 400);
    baseChecks.checkMovieId(res1);
    baseChecks.checkPrice(res1);
    baseChecks.checkshowtime(res1);
    baseChecks.checkAssento(res1);
    baseChecks.checkTicketId(res1);
    baseChecks.checkId(res1);  

console.log(res1.body)
console.log(`Status Code: ${res1.status}`); 

    
}


// Listando e fazendo limpeza

export function teardown(data) {
    const res = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT);
    const res1 = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT);
    
}
