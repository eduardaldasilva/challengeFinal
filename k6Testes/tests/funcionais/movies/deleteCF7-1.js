// Caso de Teste CF7.1 - DELETE - Deletar por ID

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'

export const options = testConfig.options.unico;
const base_uri = testConfig.environment.hml.url
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const filmes = new SharedArray('movies', function () {
    return JSON.parse(open('../../../data/dynamic/movies.json'));
  });

// Crindo item e pagndo ID
export function setup() {
    const body = randomItem(filmes);
    const post = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
    const get = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const response = JSON.parse(get.body);
    const id = response[0]._id
    return { id }   
}

// Deletando co o ID
export default function (data) {
    const id = data.id;
    const res = baseRest.del(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`)
    console.log(res.status_text)

    console.log(`Status Code: ${res.status}`);
    baseChecks.checkStatusCode(res, 204);  // User Story status code: 204, Swagger: 201
}

// Listando por ID para conferir a deleção
export function teardown(data) {
    const id = data.id;
    const res = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`)
    console.log(res.body)


}


