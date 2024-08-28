import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.smoke;
const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Carregar dados de filmes de um arquivo JSON
const movies = new SharedArray('movies', function () {
  return JSON.parse(open('../../data/dynamic/movies.json'));
});

export default function () {

  // Criar um filme
  let body = randomItem(movies);
  const postMovie = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, body);
  baseChecks.checkStatusCode(postMovie, 201);
  
  // Listar filmes
  const getMovies = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
  baseChecks.checkStatusCode(getMovies, 200);
  const response = JSON.parse(getMovies.body);
  const id = response[0]._id;
  
  // Buscar filme pelo ID
  const getMovieById = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`);
  baseChecks.checkStatusCode(getMovieById, 200);
  
  // Editar filme
  let body2 = randomItem(movies);
  const putMovie = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`, body2);
  baseChecks.checkStatusCode(putMovie, 200);
  
  // Criar um ticket para o filme
  const payload = {
    movieId: id,
    userId: "FeldvkRAioiii",
    seatNumber: 45,
    price: 33,
    showtime: "2024-10-30T18:15:21.295Z"
  };
  const postTicket = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, payload);
  baseChecks.checkStatusCode(postTicket, 201);
  
  // Listar tickets
  const getTickets = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT);
  baseChecks.checkStatusCode(getTickets, 200);
  
  // Deletar filme
  const deleteMovie = baseRest.del(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`);
  baseChecks.checkStatusCode(deleteMovie, 200);

}
