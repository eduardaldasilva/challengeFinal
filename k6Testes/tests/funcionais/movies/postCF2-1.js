//Caso de Teste CF2.1 - POST -Criando novo filme

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.one;
const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const filmes = new SharedArray('movies', function () {
    return JSON.parse(open('../../../data/dynamic/movies.json'));
});

// Criando Filme:

export default function () {
    console.log('Iniciando envio de filme...');
    const body = randomItem(filmes);
    console.log('Filme selecionado para envio:', JSON.stringify(body, null, 2));
    const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    console.log('Resposta do servidor:', JSON.stringify(res, null, 2));

    baseChecks.checkStatusCode(res, 201);
    console.log('Filme enviado e verificado com sucesso.');
    
}


// Listando e fazendo limpeza

export function teardown(data) {
    console.log('Iniciando processo de limpeza dos filmes...');
    const res = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const dados = JSON.parse(res.body);
    const ids = dados.map(item => item._id);
    ids.forEach(id => {
        const del = baseRest.del(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`);
        console.log(`Filme com ID ${id} excluído. Status: ${del.status}`);
    });
    console.log('Processo de limpeza concluído.');
}
