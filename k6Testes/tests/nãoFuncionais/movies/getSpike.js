import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

// Configurações de teste
export const options = testConfig.options.spikeMovies;
const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Carregar dados de filmes a partir do arquivo JSON
const movies = new SharedArray('movies', function () {
    return JSON.parse(open('../../../data/dynamic/movies.json'));
});

export function setup() {
    // Criar 25 filmes usando dados aleatórios do arquivo JSON
    for (let i = 0; i < 25; i++) {
        const body = randomItem(movies);
        baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    }
}

export default function () {
    // Listar filmes
    const res = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT + `?limit=20`);
    baseChecks.checkTamanho(res); // Verifica se a lista contém 20 itens
    baseChecks.checkStatusCode(res, 200);
}

export function teardown() {
    // Limpeza: Deletar todos os filmes criados
    const res = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const response = JSON.parse(res.body);
    const ids = response.map(item => item._id);
    
    ids.forEach(id => {
        baseRest.del(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`);
    });
}
