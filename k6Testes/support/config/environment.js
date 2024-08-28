export const testConfig = {
    environment: {
        hml: {
            url: "http://localhost:3000"
        }
    },

    options: {

        one: {
            vus: 1,
            duration: '1s',
            iterations: '1',
        },    

        spike: {
            vus: 2000,
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.05']
            },
            stages: [
                { duration: '2m', target: 2000 },
                { duration: '1m', target: 0 },
            ],
        },

        smoke: {
            vus: 3,
            duration: '1m',
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.05']
            }
        },

        soak: {
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.05']
            },
            stages: [
                { duration: '3m', target: 100 },
                { duration: '10m', target: 100 },
                { duration: '3m', target: 0 },
            ]
        },

        stress: {
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.05']
            },
            stages: [
                { duration: '3m', target: 200 },
                { duration: '5m', target: 200 },
                { duration: '3m', target: 0 },
            ],
        },

        load: {
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.05']
            },
            stages: [
                { duration: '3m', target: 100 },
                { duration: '5m', target: 100 },
                { duration: '3m', target: 0 },
            ]
        },
    }
}