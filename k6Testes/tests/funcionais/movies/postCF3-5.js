// Caso de Teste CF3.5 - POST - Campos obrigatórios ausentes faltando

import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';

export const options = testConfig.options.one;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Função para testar o campo title ausente
function testTitleAbsent() {
    const body = {
        "description": "Descrição",
        "launchdate": "2024-08-25T14:24:36.543Z",
        "showtimes": ["2024-08-31T19:00:00Z"]
    };

    const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    
    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 
}

// Função para testar o campo description ausente
function testDescriptionAbsent() {
    const body = {
        "title": "Filme 1",
        "launchdate": "2024-08-25T14:24:36.543Z",
        "showtimes": ["2024-08-31T19:00:00Z"]
    };

    const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
   

    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 
}

// Função para testar o campo launchdate ausente
function testLaunchdateAbsent() {
    const body = {
        "title": "Filme 1",
        "description": "Descrição",
        "showtimes": ["2024-08-31T19:00:00Z"]
    };

    const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    

    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 
}

// Função para testar o campo showtimes ausente
function testShowtimesAbsent() {
    const body = {
        "title": "Filme 1",
        "description": "Descrição",
        "launchdate": "2024-08-25T14:24:36.543Z"
    };

    const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    

    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 
}

// Execução dos testes
export default function () {
    testTitleAbsent();
    testDescriptionAbsent();
    testLaunchdateAbsent();
    testShowtimesAbsent();
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

