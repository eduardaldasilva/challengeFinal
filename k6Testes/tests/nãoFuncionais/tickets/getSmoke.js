import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js'

export const options = testConfig.options.smoke;
const base_uri = testConfig.environment.hml.url
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export default function () {
    const res = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT)
    baseChecks.checkStatusCode(res, 200);
    
}

