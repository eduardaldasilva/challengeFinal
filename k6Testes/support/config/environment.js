export const testConfig = {
    environment: {
        hml: {
            url: "http://localhost:3000"
        }
    },

    options: {
    // Funcionais:
        one: {
            vus: 1,
            duration: '1s',
            iterations: '1',
        },    

        // POST tickets
        spikePostTickets: {
        thresholds: {
            http_req_duration: ['p(95)<300'], 
            http_reqs: ['rate>50'],
            http_req_failed: ['rate<0.05'] 
        },
        stages: [
            { duration: '2m', target: 2000 },
            { duration: '30s', target: 0 },
        ],
    },

    stressPostTickets: {
        thresholds: {
            http_req_duration: ['p(95)<300'], 
            http_reqs: ['rate>50'],
            http_req_failed: ['rate<0.05'] 
        },
        stages: [
            { duration: '1m', target: 200 },
            { duration: '4m', target: 200 },
            { duration: '1m', target: 0 },
        ],
    },

    loadPostTickets: {
        thresholds: {
            http_req_duration: ['p(95)<300'], 
            http_reqs: ['rate>50'],
            http_req_failed: ['rate<0.05'] 
        },
        stages: [
            { duration: '1m', target: 100 },
            { duration: '4m', target: 100 },
            { duration: '1m', target: 0 },
        ]
    },

    soakPostTickets: {
        thresholds: {
            http_req_duration: ['p(95)<300'], 
            http_reqs: ['rate>50'],
            http_req_failed: ['rate<0.05'] 
        },
        stages: [
            { duration: '1m', target: 100 },
            { duration: '8m', target: 100 },
            { duration: '1m', target: 0 },
        ]
    },


        smokePostTickets: {
                vus: 3,
                duration: '10s',
            thresholds: {
                http_req_duration: ['p(95)<300'], 
                http_reqs: ['rate>50'],
                http_req_failed: ['rate<0.05'] 
            }
        },

        // Movies

        smokeIDMovies: {
            vus: 3,
            duration: '20s',
            thresholds: {
                http_req_duration: ['p(95)<50'], // menos de 50 milissegundos
                http_req_failed: ['rate<0.05']
            }
        },

        spikeMovies: {
            vus: 2000,
            thresholds: {
                http_req_duration: ['p(95)<100'],
                http_req_failed: ['rate<0.05']
            },
            stages: [
                { duration: '2m', target: 2000 },
                { duration: '30s', target: 0 },
            ],
        },

        loadMovies: {
            thresholds: {
                http_req_duration: ['p(95)<300'],
                http_reqs: ['rate>50'],
                http_req_failed: ['rate<0.05']
            },
            stages: [
                { duration: '1m', target: 100 },
                { duration: '4m', target: 100 },
                { duration: '1m', target: 0 },
            ]
        },

        stressMovies: {
            thresholds: {
                http_req_duration: ['p(95)<400'],
                http_reqs: ['rate>30'],
                http_req_failed: ['rate<0.05']
            },
            stages: [
                { duration: '1m', target: 200 },
                { duration: '8m', target: 200 },
                { duration: '1m', target: 0 },
            ],
        },

        soakMovies: {
            thresholds: {
                http_req_duration: ['p(95)<200'],
                http_reqs: ['rate>100'],
                http_req_failed: ['rate<0.05']
            },
            stages: [
                { duration: '1m', target: 100 },
                { duration: '2m', target: 100 },
                { duration: '1m', target: 0 },
            ]
        },


        // Parametros normais

        spike: {
            vus: 2000,
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.05']
            },
            stages: [
                { duration: '2m', target: 2000 },
                { duration: '30s', target: 0 },
            ],
        },

        smoke: {
            vus: 3,
            duration: '20s',
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
                { duration: '1m', target: 100 },
                { duration: '8m', target: 100 },
                { duration: '1m', target: 0 },
            ]
        },

        stress: {
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.05']
            },
            stages: [
                { duration: '1m', target: 200 },
                { duration: '4m', target: 200 },
                { duration: '1m', target: 0 },
            ],
        },

        load: {
            thresholds: {
                http_req_duration: ['p(95)<2000'],
                http_req_failed: ['rate<0.05']
            },
            stages: [
                { duration: '1m', target: 100 },
                { duration: '4m', target: 100 },
                { duration: '1m', target: 0 },
            ]
        },
    }
}