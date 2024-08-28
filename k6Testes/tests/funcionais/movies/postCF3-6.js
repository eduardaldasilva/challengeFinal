// Caso de Teste CF3.6 - POST - Filme duplicado

import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';

export const options = testConfig.options.one;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Função de setup para criar um filme
export function setup() {
    const body = {
        "title": "Filme 1",
        "description": "Criando filme duplicado",
        "launchdate": "2024-08-26T14:24:36.543Z",
        "showtimes": ["2024-08-31T19:00:00Z"]
    };

    const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    baseChecks.checkStatusCode(res, 201); // Verifica se a criação foi bem-sucedida

    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 
}

// Função de default para tentar criar o filme duplicado
export default function () {
    const body = {
        "title": "Filme 1",
        "description": "Criando filme duplicado",
        "launchdate": "2024-08-26T14:24:36.543Z",
        "showtimes": ["2024-08-31T19:00:00Z"]
    };

    const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    console.log(`Tentativa de Duplicação`);
    baseChecks.checkStatusCode(res, 400); // Verifica se o código de status é 400 para duplicação


    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 
}

// Limpeza

export function teardown() {
    const res = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT)
    const dados = JSON.parse(res.body);
    const ids = dados.map(item => item._id);
    ids.forEach(id => {
        const del = baseRest.del(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`);
    })
}

