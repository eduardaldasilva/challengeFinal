import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from './k6Testes/support/base/baseTest.js';

export const options = testConfig.options.one;
const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Carregue os dados estáticos do arquivo JSON
const data = new SharedArray('Movies', function () {
  return JSON.parse(open('../../../data/static/static.json'));
});

// Defina o payload corretamente como um objeto
const payload = {
    "title": 123,
    "description": "Testando dado number",
    "launchdate": "2025-05-18T10:00:04.158Z",
    "showtimes": [
        "09h00",
        "15h00"
    ]
};

export default function () {
    // Envia o payload para o endpoint
    const res = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, payload);

    // Adiciona logs detalhados para depuração
    console.log('Request URL:', ENDPOINTS.MOVIES_ENDPOINT);
    console.log('Request Payload:', JSON.stringify(payload));
    console.log('Response Status:', res.status);
    console.log('Response Body:', res.body);

    // Verifica o código de status da resposta
    baseChecks.checkStatusCode(res, 400);
}

