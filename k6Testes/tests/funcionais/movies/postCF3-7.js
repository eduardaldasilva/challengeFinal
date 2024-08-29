// Caso de Teste CF3.7 - POST - Criando filme com campos vazios

import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.one;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Função para criar filme com campos vazios
export default function () {
    const body = {
        "title": "",
        "description": "",
        "launchdate": "",
        "showtimes": []
    };

    const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
   
    // Verifica se o status da resposta é 400 (Bad Request)
    baseChecks.checkStatusCode(res, 400);
    
    // Logs para depuração
    console.log(`Response body: ${res.body}`);
    console.log(`Status Code: ${res.status}`); 
}

// Limpeza
export function teardown() {
    const res = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    console.log(`Checar se ID foi retornado no GET: ${res.body}`);
    
    const dados = JSON.parse(res.body);
    const ids = dados.map(item => item._id);
    
    // Excluindo cada filme encontrado
    ids.forEach(id => {
        const del = baseRest.del(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`);
        console.log(`Excluindo filme com ID: ${id}`);
        console.log(`Resposta da exclusão: ${del.body}`);
    });
}
