// Caso de Teste - CF1.1 - Listar filmes

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'

export const options = testConfig.options.one;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();


// GET - Listar todos os filmes

export default function () {
    const res = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    console.log('Request URL:', base_uri + ENDPOINTS.MOVIES_ENDPOINT);
    console.log('Response status:', res.status);
    console.log('Response body:', res.body);
    
    baseChecks.checkStatusCode(res, 200);
    baseChecks.checkFilmeTitulo(res);  
    baseChecks.checkFilmeDescricao(res); 
    baseChecks.checklaunchdate(res);  
    baseChecks.checkshowtimes(res); 
    baseChecks.checkId(res); 

    console.log(res.body)
    console.log(`Status Code: ${res.status}`); 
}
