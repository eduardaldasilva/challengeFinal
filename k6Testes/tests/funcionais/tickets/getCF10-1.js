// Caso de Teste CF9.1 - GET - Listar todos os tickets

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.one;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();


// GET - Listar todos os tickets

export default function () {
    const res = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT);
    console.log('Request URL:', base_uri + ENDPOINTS.TICKETS_ENDPOINT);

    
    baseChecks.checkStatusCode(res, 200);
    baseChecks.checkMovieId(res);
    baseChecks.checkPrice(res);
    baseChecks.checkshowtime(res);
    baseChecks.checkAssento(res);
    baseChecks.checkTicketId(res);
    baseChecks.checkId(res); 

    console.log(`Status Code: ${res.status}`); 
}