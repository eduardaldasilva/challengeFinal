export class BaseService {
    constructor(base_uri) {
        this.base_uri = base_uri;
        this.response;
    }

    getResponse() {
        return this.response;
    }
}