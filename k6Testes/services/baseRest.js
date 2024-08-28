import http from 'k6/http';
import { BaseService } from "./baseService.js";

export class BaseRest extends BaseService {
    constructor(base_uri) {
        super(base_uri);
    }

    get(endpoint) {
        let uri = this.base_uri + endpoint;
        return http.get(uri);
    }

    post(endpoint, body) {
        let uri = this.base_uri + endpoint;
        return http.post(uri, JSON.stringify(body), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    put(endpoint, body) {
        let uri = this.base_uri + endpoint;
        return http.put(uri, JSON.stringify(body), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    del(endpoint) {
        let uri = this.base_uri + endpoint;
        return http.del(uri);
    }
}
