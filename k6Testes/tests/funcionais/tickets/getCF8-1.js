// Caso de Teste CF8.1 - Listar todos os tickets

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'

export const options = testConfig.options.one;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();


// GET - Listar todos os tickets

export default function () {
    const res = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT);
    console.log('Request URL:', base_uri + ENDPOINTS.TICKETS_ENDPOINT);
    console.log('Response status:', res.status);
    console.log('Response body:', res.body);
    
    baseChecks.checkStatusCode(res, 200);
    baseChecks.checkMovieId(res);
    baseChecks.checkPrice(res);
    baseChecks.checkshowtime(res);
    baseChecks.checkAssento(res);
    baseChecks.checkTicketId(res);
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 
}