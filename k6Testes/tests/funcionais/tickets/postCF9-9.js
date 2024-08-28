// Caso de Teste CF9.9 - POST - Campos vazios

import { BaseRest, BaseChecks, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';

export const options = testConfig.options.one;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Função para testar o campo movieId vazio
function testMovieIdEmpty() {
    const body = {
        "movieId": "",
        "userId": "usuario1",
        "seatNumber": 10,
        "price": 20,
        "showtime": "2024-08-25T14:24:36.543Z"
    };

    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, body);

    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkMovieId(res); 
    baseChecks.checkSeatNumber(res);
    baseChecks.checkPrice(res);
    baseChecks.checkShowtime(res);
    baseChecks.checkTicketId(res); 

    
    console.log(res.body);
    console.log(`Status Code: ${res.status}`);
}

// Função para testar o campo userId vazio
function testUserIdEmpty() {
    const body = {
        "movieId": "filme1",
        "userId": "",
        "seatNumber": 10,
        "price": 20,
        "showtime": "2024-08-25T14:24:36.543Z"
    };

    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, body);

    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkMovieId(res);
    baseChecks.checkSeatNumber(res);
    baseChecks.checkPrice(res);
    baseChecks.checkShowtime(res);
    baseChecks.checkTicketId(res); 

    console.log(res.body);
    console.log(`Status Code: ${res.status}`);
}

// Função para testar o campo seatNumber vazio
function testSeatNumberEmpty() {
    const body = {
        "movieId": "filme1",
        "userId": "usuario1",
        "seatNumber": "",
        "price": 20,
        "showtime": "2024-08-25T14:24:36.543Z"
    };

    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, body);

    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkMovieId(res);
    baseChecks.checkSeatNumber(res); 
    baseChecks.checkPrice(res);
    baseChecks.checkShowtime(res);
    baseChecks.checkTicketId(res); 

    console.log(res.body);
    console.log(`Status Code: ${res.status}`);
}

// Função para testar o campo price vazio
function testPriceEmpty() {
    const body = {
        "movieId": "filme1",
        "userId": "usuario1",
        "seatNumber": 10,
        "price": "",
        "showtime": "2024-08-25T14:24:36.543Z"
    };

    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, body);

    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkMovieId(res);
    baseChecks.checkSeatNumber(res);
    baseChecks.checkPrice(res); 
    baseChecks.checkShowtime(res);
    baseChecks.checkTicketId(res); 

    console.log(res.body);
    console.log(`Status Code: ${res.status}`);
}

// Função para testar o campo showtime vazio
function testShowtimeEmpty() {
    const body = {
        "movieId": "filme1",
        "userId": "usuario1",
        "seatNumber": 10,
        "price": 20,
        "showtime": ""
    };

    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, body);

    baseChecks.checkStatusCode(res, 400);
    baseChecks.checkMovieId(res);
    baseChecks.checkSeatNumber(res);
    baseChecks.checkPrice(res);
    baseChecks.checkShowtime(res); 
    baseChecks.checkTicketId(res); 

    console.log(res.body);
    console.log(`Status Code: ${res.status}`);
}

// Execução dos testes
export default function () {
    testMovieIdEmpty();
    testUserIdEmpty();
    testSeatNumberEmpty();
    testPriceEmpty();
    testShowtimeEmpty();
}