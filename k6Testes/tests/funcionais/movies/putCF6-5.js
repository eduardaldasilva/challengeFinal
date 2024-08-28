// Caso de Teste CF6.5 - PUT - Atualizar com campos faltando

import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';

export const options = testConfig.options.one;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const filmes = new SharedArray('movies', function () {
    return JSON.parse(open('../../../data/dynamic/movies.json'));
});

//Criando filme e pegando o ID
export function setup() {
    const body = randomItem(filmes);
    const post = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    const get = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const response = JSON.parse(get.body);
    const id = response[0]._id;
    return { id };
}

// Função para testar o campo title ausente no PUT
function testTitleAbsent(id) {
    const body = {
        "description": "Descrição 1",
        "launchdate": "2024-08-25T14:24:36.543Z",
        "showtimes": ["2024-08-31T19:00:00Z"]
    };

    const res = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`, body);
    console.log(res.body)
    console.log(`Status Code: ${res.status}`);
    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 
}

// Função para testar o campo description ausente no PUT
function testDescriptionAbsent(id) {
    const body = {
        "title": "Filme 2",
        "launchdate": "2024-08-25T14:24:36.543Z",
        "showtimes": ["2024-08-31T19:00:00Z"]
    };

    const res = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`, body);
    console.log(res.body)
    console.log(`Status Code: ${res.status}`);
    baseChecks.checkStatusCode(res, 400);
}

// Função para testar o campo launchdate ausente no PUT
function testLaunchdateAbsent(id) {
    const body = {
        "title": "Filme 3",
        "description": "Descrição 3",
        "showtimes": ["2024-08-31T19:00:00Z"]
    };

    const res = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`, body);
    console.log(res.body)
    console.log(`Status Code: ${res.status}`);
    
    baseChecks.checkStatusCode(res, 400);
}

// Função para testar o campo showtimes ausente no PUT
function testShowtimesAbsent(id) {
    const body = {
        "title": "Filme 4",
        "description": "Descrição 4",
        "launchdate": "2024-08-25T14:24:36.543Z"
    };

    const res = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`, body);
    console.log(res.body)
    console.log(`Status Code: ${res.status}`);
    baseChecks.checkStatusCode(res, 400);
}

// Execução dos testes
export default function (data) {
    const { id } = data;
    testTitleAbsent(id);
    testDescriptionAbsent(id);
    testLaunchdateAbsent(id);
    testShowtimesAbsent(id);
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
