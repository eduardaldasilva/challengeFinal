import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = testConfig.options.smokePostTickets;
const base_uri = testConfig.environment.hml.url
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

const tickets = new SharedArray('tickets', function () {
    return JSON.parse(open('../../../data/dynamic/tickets.json'));
  });

export default function () {
    const payload = randomItem(tickets);
    const res = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, payload);
    baseChecks.checkStatusCode(res, 201);
          
}

