// Caso de Trste CF12.1 - DELETE - Deletar ticket por ID


import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.one;
const base_uri = testConfig.environment.hml.url
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

// Utilizando o ID para deletar

export default function (data) {
    const id = data.id;
    const res = baseRest.del(ENDPOINTS.TICKETS_ENDPOINT + `/${id}`)
    console.log(res.body)

    baseChecks.checkStatusCode(res, 200);
    console.log(`Status Code: ${res.status}`); 
}


