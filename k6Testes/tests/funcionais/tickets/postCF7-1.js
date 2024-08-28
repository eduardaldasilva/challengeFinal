// Caso de Teste CF7.1 - Criar ticket

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

export default function () {
    const body = randomItem(tickets);
    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, body);

    baseChecks.checkStatusCode(res, 201);
    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 
    
}


// Listando e fazendo limpeza

export function teardown(data) {
    const res = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT);
    console.log('Request URL:', base_uri + ENDPOINTS.TICKETS_ENDPOINT);
    console.log('Response status:', res.status);
    console.log('Response body:', res.body);
}
