import http from 'k6/http';
import { BaseService } from "./baseService.js";

export class BaseRest extends BaseService {
    constructor(base_uri) {
        super(base_uri);
    }


    get(endpoint) {
        let uri = this.base_uri + endpoint;
        return http.get(uri)
    }

    post(endpoint, body) {
        let uri = this.base_uri + endpoint;
        return http.post(uri, body)
    }

    put(endpoint, body) {
        let uri = this.base_uri + endpoint;
        return http.put(uri, body)
    }

    del(endpoint) {
        let uri = this.base_uri + endpoint;
        return http.del(uri)
    }

}