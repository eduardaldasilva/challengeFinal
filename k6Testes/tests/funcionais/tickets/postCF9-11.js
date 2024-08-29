// Caso de Teste CF9.11 - POST - criar ticket duplicado

import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.one;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Função de setup para criar um ticket
export function setup() {
    const body = {
        "movieId": "abc123",
        "userId": "user456",
        "seatNumber": 10,
        "price": 50,
        "showtime": "2024-08-31T19:00:00Z"
    };

    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, body);
    baseChecks.checkStatusCode(res, 201); // Verifica se a criação foi bem-sucedida

   
    baseChecks.checkMovieId(res);  
    baseChecks.checkUserId(res); 
    baseChecks.checkAssento(res);  
    baseChecks.checkPrice(res); 
    baseChecks.checkshowtime(res); 
    baseChecks.checkTicketId(res);  

    console.log(res.body);
    console.log(`Status Code: ${res.status}`); 

    return { requestBody: body };
}

// Função default para tentar criar o ticket duplicado
export default function (data) {
    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, data.requestBody);
    console.log(`Tentativa de Duplicação`);
    baseChecks.checkStatusCode(res, 400); // Verifica se o código de status é 400 para duplicação

    baseChecks.checkMovieId(res);  
    baseChecks.checkUserId(res); 
    baseChecks.checkAssento(res);  
    baseChecks.checkPrice(res); 
    baseChecks.checkshowtime(res); 
    baseChecks.checkTicketId(res); 

    console.log(res.body);
    console.log(`Status Code: ${res.status}`); 
}
