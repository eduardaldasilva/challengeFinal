// Teste de estresse - DELETE/{id}

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.stressMovies;
const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Carregar dados de filmes a partir do arquivo JSON
const filmes = new SharedArray('movies', function () {
    return JSON.parse(open('../../../data/dynamic/movies.json'));
});

export default function () {
    // Criar um filme
    const body = randomItem(filmes);
    const postResponse = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    baseChecks.checkStatusCode(postResponse, 201); // Verifica se o filme foi criado com sucesso

    // Buscar todos os filmes e encontrar o filme recém-criado
    const getResponse = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const response = JSON.parse(getResponse.body);

    // Filtrar para encontrar o ID do filme criado com base em um campo único, como o nome
    const filmeCriado = response.find(filme => filme.nome === body.nome);

    if (filmeCriado) {
        const id = filmeCriado._id;

        // Excluir o filme criado
        const deleteResponse = baseRest.del(`${ENDPOINTS.MOVIES_ENDPOINT}/${id}`);
        baseChecks.checkStatusCode(deleteResponse, 200); // Verificar se a exclusão foi bem-sucedida
    } else {
        console.error('Filme criado não encontrado na lista de filmes.');
    }
}

