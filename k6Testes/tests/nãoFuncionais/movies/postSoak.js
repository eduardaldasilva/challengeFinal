import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';
import { sleep } from 'k6';

export const options = testConfig.options.soakMovies;
const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Carregar dados de filmes uma vez e reutilizar
const filmes = new SharedArray('movies', function () {
    return JSON.parse(open('../../../data/dynamic/movies.json'));
});

export default function () {
    const body = randomItem(filmes);
    const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    baseChecks.checkStatusCode(res, 201); 
    sleep(1);     
}

export function teardown(data) {
    // Buscar todos os filmes
    const res = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const dados = JSON.parse(res.body);
    
    // Verificar se a resposta tem a estrutura esperada
    if (Array.isArray(dados)) {
        const ids = dados.map(item => item._id);
        
        // Deletar todos os filmes encontrados
        ids.forEach(id => {
            const delRes = baseRest.del(`${ENDPOINTS.MOVIES_ENDPOINT}/${id}`);
            baseChecks.checkStatusCode(delRes, 200); // Verifique se a exclusão foi bem-sucedida
        });
    } else {
        console.error('A resposta do GET /movies não está no formato esperado.');
    }
}
