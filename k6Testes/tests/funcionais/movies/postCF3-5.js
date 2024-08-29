// Caso de Teste CF3.5 - POST - Campos obrigatórios ausentes

import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';

export const options = testConfig.options.one;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Função para testar o campo título ausente
function testarTituloAusente() {
    const body = {
        "descricao": "Descrição",
        "dataLancamento": "2024-08-25T14:24:36.543Z",
        "horarios": ["2024-08-31T19:00:00Z"]
    };

    const resTituloAusente = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    
    console.log(resTituloAusente.body);
    console.log(`Código de Status: ${resTituloAusente.status}`);

    baseChecks.checkStatusCode(resTituloAusente, 400);
    baseChecks.checkFilmeTitulo(resTituloAusente);  
    baseChecks.checkFilmeDescricao(resTituloAusente); 
    baseChecks.checklaunchdate(resTituloAusente);  
    baseChecks.checkshowtimes(resTituloAusente); 
    baseChecks.checkId(resTituloAusente); 
}

// Função para testar o campo descrição ausente
function testarDescricaoAusente() {
    const body = {
        "titulo": "Filme 1",
        "dataLancamento": "2024-08-25T14:24:36.543Z",
        "horarios": ["2024-08-31T19:00:00Z"]
    };

    const resDescricaoAusente = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    
    console.log(resDescricaoAusente.body);
    console.log(`Código de Status: ${resDescricaoAusente.status}`);

    baseChecks.checkStatusCode(resDescricaoAusente, 400);
    baseChecks.checkFilmeTitulo(resDescricaoAusente);  
    baseChecks.checkFilmeDescricao(resDescricaoAusente); 
    baseChecks.checklaunchdate(resDescricaoAusente);  
    baseChecks.checkshowtimes(resDescricaoAusente); 
    baseChecks.checkId(resDescricaoAusente); 
}

// Função para testar o campo data de lançamento ausente
function testarDataLancamentoAusente() {
    const body = {
        "titulo": "Filme 1",
        "descricao": "Descrição",
        "horarios": ["2024-08-31T19:00:00Z"]
    };

    const resDataLancamentoAusente = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    
    console.log(resDataLancamentoAusente.body);
    console.log(`Código de Status: ${resDataLancamentoAusente.status}`);

    baseChecks.checkStatusCode(resDataLancamentoAusente, 400);
    baseChecks.checkFilmeTitulo(resDataLancamentoAusente);  
    baseChecks.checkFilmeDescricao(resDataLancamentoAusente); 
    baseChecks.checklaunchdate(resDataLancamentoAusente);  
    baseChecks.checkshowtimes(resDataLancamentoAusente); 
    baseChecks.checkId(resDataLancamentoAusente); 
}

// Função para testar o campo horários ausente
function testarHorariosAusente() {
    const body = {
        "titulo": "Filme 1",
        "descricao": "Descrição",
        "dataLancamento": "2024-08-25T14:24:36.543Z"
    };

    const resHorariosAusente = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    
    console.log(resHorariosAusente.body);
    console.log(`Código de Status: ${resHorariosAusente.status}`);

    baseChecks.checkStatusCode(resHorariosAusente, 400);
    baseChecks.checkFilmeTitulo(resHorariosAusente);  
    baseChecks.checkFilmeDescricao(resHorariosAusente); 
    baseChecks.checklaunchdate(resHorariosAusente);  
    baseChecks.checkshowtimes(resHorariosAusente); 
    baseChecks.checkId(resHorariosAusente); 
}

// Execução dos testes
export default function () {
    testarTituloAusente();
    testarDescricaoAusente();
    testarDataLancamentoAusente();
    testarHorariosAusente();
}

// Limpeza
export function teardown() {
    const res = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const dados = JSON.parse(res.body);
    const ids = dados.map(item => item._id);
    ids.forEach(id => {
        baseRest.del(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`);
    });
}
