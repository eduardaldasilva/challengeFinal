// Caso de Teste CF8.1 - POST - Criar ticket

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';


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
    baseChecks.checkMovieId(res);
    baseChecks.checkPrice(res);
    baseChecks.checkshowtime(res);
    baseChecks.checkAssento(res);
    baseChecks.checkTicketId(res);
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 
    
}