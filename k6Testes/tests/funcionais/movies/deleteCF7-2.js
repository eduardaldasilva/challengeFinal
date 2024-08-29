// Caso de Teste CF7.2 - DELETE - Deletar com ID inexistente e inválido

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.one;
const base_uri = testConfig.environment.hml.url
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// DELETE  com ID: .

export default function (data) {

    const res = baseRest.del(ENDPOINTS.MOVIES_ENDPOINT + `.`)
    baseChecks.checkStatusCode(res, 404); 

    console.log(`Status Code: ${res.status}`); 
    console.log(res.body)
}



