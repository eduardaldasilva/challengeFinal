import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

// Configuração do teste
export const options = testConfig.options.stress;
const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

// Carregar dados de filmes e tickets de arquivos JSON
const movies = new SharedArray('movies', function () {
  return JSON.parse(open('../../data/dynamic/movies.json'));
});

const tickets = new SharedArray('tickets', function () {
  return JSON.parse(open('../../data/dynamic/tickets.json'));
});

export default function () {

  // Criar um filme 
  let movieData = randomItem(movies);
  const postMovie = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, movieData);
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
  let updatedMovieData = randomItem(movies);
  const putMovie = baseRest.put(ENDPOINTS.MOVIES_ENDPOINT + `/${id}`, updatedMovieData);
  baseChecks.checkStatusCode(putMovie, 200);
  
  // Criar um ticket
  let ticketData = randomItem(tickets);
  const payload = {
    movieId: id, 
    userId: ticketData.userId,
    seatNumber: ticketData.seatNumber,
    price: ticketData.price,
    showtime: ticketData.showtime
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
