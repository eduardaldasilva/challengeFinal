import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

// Configurações do teste
export const options = testConfig.options.stressMovies;
const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Carregar dados dos filmes
const filmes = new SharedArray('movies', function () {
    return JSON.parse(open('../../../data/dynamic/movies.json'));
});

export default function () {
    // Criar um filme
    const body = randomItem(filmes);
    const postResponse = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);

    // Buscar todos os filmes e obter o ID do primeiro filme
    const getResponse = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const response = JSON.parse(getResponse.body);
    if (response.length > 0) {
        const id = response[0]._id;

        // Excluir o filme criado
        const deleteResponse = baseRest.del(`${ENDPOINTS.MOVIES_ENDPOINT}/${id}`);
        baseChecks.checkStatusCode(deleteResponse, 200); // Verificar se a exclusão foi bem-sucedida
    }
}
