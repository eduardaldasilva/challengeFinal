// Teste smoke - GET/{id}

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.smokeIDMovies;
const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Carregar dados de filmes a partir do arquivo JSON
const filmes = new SharedArray('movies', function () {
    return JSON.parse(open('../../../data/dynamic/movies.json'));
});

// Criando filme e obtendo o ID
export function setup() {
    const body = randomItem(filmes);
    baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);

    // Buscar o filme pelo nome (ou outro campo único) para obter o ID
    const get = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const response = JSON.parse(get.body);
    const filmeCriado = response.find(filme => filme.nome === body.nome);

    if (filmeCriado) {
        return { id: filmeCriado._id };
    } else {
        throw new Error('Filme criado não encontrado na lista de filmes.');
    }
}

// Usando o ID do setup para listar
export default function (data) {
    const id = data.id;
    const res = baseRest.get(`${ENDPOINTS.MOVIES_ENDPOINT}/${id}`);
    baseChecks.checkStatusCode(res, 200);
}

// Limpeza de dados
export function teardown(data) {
    const id = data.id;
    baseRest.del(`${ENDPOINTS.MOVIES_ENDPOINT}/${id}`);
}
