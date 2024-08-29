// Caso de Teste CF4.1 - GET - Listar por ID válido

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.one;
const base_uri = testConfig.environment.hml.url
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const filmes = new SharedArray('movies', function () {
    return JSON.parse(open('../../../data/dynamic/movies.json'));
  });


// Listando filme e pegando ID

export function setup() {
    const body = randomItem(filmes);
    const post = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    const get = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const response = JSON.parse(get.body);
    const id = response[0]._id
    return { id }   
}

// Usando o ID para listar o filme

export default function (data) {
    const id = data.id;
    const res = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`)
    
    baseChecks.checkStatusCode(res, 200);
    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 
    

}

// Apagando dados de teste

export function teardown() {
    const res = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT)
    const dados = JSON.parse(res.body);
    const ids = dados.map(item => item._id);
    ids.forEach(id => {
        const del = baseRest.del(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`);
    })
}


