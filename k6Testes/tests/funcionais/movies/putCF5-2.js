// Caso de Teste CF5.2 - PUT - Atualizar com ID inexistente e inválido

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'

export const options = testConfig.options.one;
const base_uri = testConfig.environment.hml.url
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// PUT  com ID: .

export default function (data) {

    const res = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `.`)
    baseChecks.checkStatusCode(res, 404); 
    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 

    console.log(`Status Code: ${res.status}`); 
    console.log(res.body)
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


