// Caso de Teste CF10.1 - GET - Listar ticket pelo ID 

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

// Preparando criação do ticket, pegar o ID 

export function setup() {
    const body = randomItem(tickets);
    const post = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, body);
    const get = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT);
    const response = JSON.parse(get.body);
    const id = response[0]._id
    return { id }   
}

// Utilizando o ID para listar

export default function (data) {
    const id = data.id;
    const res = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT + `/${id}`)
    
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

export function teardown() {
    const res = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT)
    const dados = JSON.parse(res.body);
    const ids = dados.map(item => item._id);
    ids.forEach(id => {
        const del = baseRest.del(ENDPOINTS.TICKETS_ENDPOINT+ `/${id}`);
    })
}

