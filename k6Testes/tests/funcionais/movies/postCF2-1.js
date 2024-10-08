//Caso de Teste CF2.1 - POST -Criando novo filme

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.one;
const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const filmes = new SharedArray('movies', function () {
    return JSON.parse(open('../../../data/dynamic/movies.json'));
});

// Criando Filme:

export default function () {
    const body = randomItem(filmes);
    const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);

    console.log(`Response body: ${res.body}`);
    console.log(`Código de Status: ${res.status}`);
    baseChecks.checkStatusCode(res, 201);
    
    
}


// Listando e fazendo limpeza

export function teardown(data) {
    const res = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    console.log(`Checar se ID foi retornado no GET: ${res.body}`);
    const dados = JSON.parse(res.body);
    const ids = dados.map(item => item._id);
    ids.forEach(id => {
        const del = baseRest.del(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`);
    });
}
