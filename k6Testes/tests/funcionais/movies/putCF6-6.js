// Caso de Teste CF6.6 - PUT - Atualizar com campos vazios

import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.one;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const filmes = new SharedArray('movies', function () {
    return JSON.parse(open('../../../data/dynamic/movies.json'));
});

// Criando filmes e pegando o ID
export function setup() {
    const body = randomItem(filmes);
    const post = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    const get = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const response = JSON.parse(get.body);
    const id = response[0]._id;
    return { id };
}

// Atualizando corpo com todos os campos vazios

export default function (data) {
    const id = data.id;
    const res = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`, body);

    const body = {
        "title": "",
        "description": "",
        "launchdate": "",
        "showtimes": []
    };

    
    console.log(res.body)
    console.log(`Status Code: ${res.status}`);
    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 

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

