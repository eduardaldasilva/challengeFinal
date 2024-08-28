// Caso de Teste CF5.1 - PUT - Atualizar por ID existente

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'

export const options = testConfig.options.one;
const base_uri = testConfig.environment.hml.url
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const filmes = new SharedArray('movies', function () {
    return JSON.parse(open('../../../data/dynamic/movies.json'));
  });


// Criando filme e pegando o ID
export function setup() {
    const body = randomItem(filmes);
    const post = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    const get = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const response = JSON.parse(get.body);
    const id = response[0]._id
    return { id }   
}

// Atualizando pelo ID
export default function (data) {
    const id = data.id;
    const res = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`)
    
    baseChecks.checkStatusCode(res, 200); // documentação 201
    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); // mostrar na tela que o status code é 200
    

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


