// Caso de teste CF9.1 - Atualizar ticket

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

// Utilizando o ID para atualizar

export default function (data) {
    const id = data.id;
    const body = randomItem(tickets);
    const res = baseRest.put(ENDPOINTS.TICKETS_ENDPOINT + `/${id}`, body)
    console.log(res.body)
    
    baseChecks.checkStatusCode(res, 200);
    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 

}


