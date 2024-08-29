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

// Criando filme e pegando o ID
export function setup() {
    const body = randomItem(filmes);
    const post = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    const get = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const response = JSON.parse(get.body);
    const id = response[0]._id;
    return { id };
}

// Função para testar o campo title ausente no PUT
function testarTituloAusente(id) {
    const body = {
        "description": "Descrição 1",
        "launchdate": "2024-08-25T14:24:36.543Z",
        "showtimes": ["2024-08-31T19:00:00Z"]
    };

    const resTituloAusente = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`, body);
    console.log(resTituloAusente.body);
    console.log(`Status Code: ${resTituloAusente.status}`);
    baseChecks.checkStatusCode(resTituloAusente, 400);
    baseChecks.checkFilmeTitulo(resTituloAusente);
    baseChecks.checkFilmeDescricao(resTituloAusente);
    baseChecks.checklaunchdate(resTituloAusente);
    baseChecks.checkshowtimes(resTituloAusente);
    baseChecks.checkId(resTituloAusente);
}

// Função para testar o campo description ausente no PUT
function testarDescricaoAusente(id) {
    const body = {
        "title": "Filme 2",
        "launchdate": "2024-08-25T14:24:36.543Z",
        "showtimes": ["2024-08-31T19:00:00Z"]
    };

    const resDescricaoAusente = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`, body);
    console.log(resDescricaoAusente.body);
    console.log(`Status Code: ${resDescricaoAusente.status}`);
    baseChecks.checkStatusCode(resDescricaoAusente, 400);
    baseChecks.checkFilmeTitulo(resDescricaoAusente);
    baseChecks.checkFilmeDescricao(resDescricaoAusente);
    baseChecks.checklaunchdate(resDescricaoAusente);
    baseChecks.checkshowtimes(resDescricaoAusente);
    baseChecks.checkId(resDescricaoAusente);
}

// Função para testar o campo launchdate ausente no PUT
function testarDataLancamentoAusente(id) {
    const body = {
        "title": "Filme 3",
        "description": "Descrição 3",
        "showtimes": ["2024-08-31T19:00:00Z"]
    };

    const resDataLancamentoAusente = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`, body);
    console.log(resDataLancamentoAusente.body);
    console.log(`Status Code: ${resDataLancamentoAusente.status}`);
    baseChecks.checkStatusCode(resDataLancamentoAusente, 400);
    baseChecks.checkFilmeTitulo(resDataLancamentoAusente);
    baseChecks.checkFilmeDescricao(resDataLancamentoAusente);
    baseChecks.checklaunchdate(resDataLancamentoAusente);
    baseChecks.checkshowtimes(resDataLancamentoAusente);
    baseChecks.checkId(resDataLancamentoAusente);
}

// Função para testar o campo showtimes ausente no PUT
function testarHorariosAusente(id) {
    const body = {
        "title": "Filme 4",
        "description": "Descrição 4",
        "launchdate": "2024-08-25T14:24:36.543Z"
    };

    const resHorariosAusente = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`, body);
    console.log(resHorariosAusente.body);
    console.log(`Status Code: ${resHorariosAusente.status}`);
    baseChecks.checkStatusCode(resHorariosAusente, 400);
    baseChecks.checkFilmeTitulo(resHorariosAusente);
    baseChecks.checkFilmeDescricao(resHorariosAusente);
    baseChecks.checklaunchdate(resHorariosAusente);
    baseChecks.checkshowtimes(resHorariosAusente);
    baseChecks.checkId(resHorariosAusente);
}

// Execução dos testes
export default function (data) {
    const { id } = data;
    testarTituloAusente(id);
    testarDescricaoAusente(id);
    testarDataLancamentoAusente(id);
    testarHorariosAusente(id);
}
