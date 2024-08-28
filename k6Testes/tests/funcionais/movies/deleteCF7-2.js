// Caso de Teste CF7.2 - DELETE - Deletar com ID inexistente e inválido

import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'

export const options = testConfig.options.one;
const base_uri = testConfig.environment.hml.url
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// DELETE  com ID: .

export default function (data) {

    const res = baseRest.del(ENDPOINTS.MOVIES_ENDPOINT + `.`)
    baseChecks.checkStatusCode(res, 404); 

    console.log(`Status Code: ${res.status}`); 
    console.log(res.body)
}

// Listando por ID para conferir a deleção
export function teardown(data) {
    const id = data.id;
    const res = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`)
    console.log(res.body)


}


