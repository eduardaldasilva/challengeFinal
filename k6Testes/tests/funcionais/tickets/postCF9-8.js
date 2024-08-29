// Caso de Teste CF9.8 - POST - Campos obrigatórios ausentes faltando

import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.one;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Função para testar o campo movieId ausente
function testMovieIdAbsent() {
    const body = {
        "userId": "usuario1",
        "seatNumber": 10,
        "price": 20,
        "showtime": "2024-08-25T14:24:36.543Z"
    };

    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, body);
    
    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkMovieId(res);
    baseChecks.checkPrice(res);
    baseChecks.checkshowtime(res);
    baseChecks.checkAssento(res);
    baseChecks.checkTicketId(res);
    baseChecks.checkUserId(res);


    console.log(res.body);
    console.log(`Status Code: ${res.status}`);
}

// Função para testar o campo userId ausente
function testUserIdAbsent() {
    const body = {
        "movieId": "filme1",
        "seatNumber": 10,
        "price": 20,
        "showtime": "2024-08-25T14:24:36.543Z"
    };

    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, body);

    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkMovieId(res);
    baseChecks.checkPrice(res);
    baseChecks.checkshowtime(res);
    baseChecks.checkAssento(res);
    baseChecks.checkTicketId(res);
    baseChecks.checkUserId(res);

    console.log(res.body);
    console.log(`Status Code: ${res.status}`);
}

// Função para testar o campo seatNumber ausente
function testSeatNumberAbsent() {
    const body = {
        "movieId": "filme1",
        "userId": "usuario1",
        "price": 20,
        "showtime": "2024-08-25T14:24:36.543Z"
    };

    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, body);

    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkMovieId(res);
    baseChecks.checkPrice(res);
    baseChecks.checkshowtime(res);
    baseChecks.checkAssento(res);
    baseChecks.checkTicketId(res);
    baseChecks.checkUserId(res);

    console.log(res.body);
    console.log(`Status Code: ${res.status}`);
}

// Função para testar o campo price ausente
function testPriceAbsent() {
    const body = {
        "movieId": "filme1",
        "userId": "usuario1",
        "seatNumber": 10,
        "showtime": "2024-08-25T14:24:36.543Z"
    };

    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, body);

    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkMovieId(res);
    baseChecks.checkPrice(res);
    baseChecks.checkshowtime(res);
    baseChecks.checkAssento(res);
    baseChecks.checkTicketId(res);
    baseChecks.checkUserId(res);

    console.log(res.body);
    console.log(`Status Code: ${res.status}`);
}

// Função para testar o campo showtime ausente
function testShowtimeAbsent() {
    const body = {
        "movieId": "filme1",
        "userId": "usuario1",
        "seatNumber": 10,
        "price": 20
    };

    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, body);

    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkMovieId(res);
    baseChecks.checkPrice(res);
    baseChecks.checkshowtime(res);
    baseChecks.checkAssento(res);
    baseChecks.checkTicketId(res);
    baseChecks.checkUserId(res);

    console.log(res.body);
    console.log(`Status Code: ${res.status}`);
}

// Execução dos testes
export default function () {
    testMovieIdAbsent();
    testUserIdAbsent();
    testSeatNumberAbsent();
    testPriceAbsent();
    testShowtimeAbsent();
}
