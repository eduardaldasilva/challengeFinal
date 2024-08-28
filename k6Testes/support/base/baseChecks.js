import { check } from 'k6';

export class BaseChecks {
    checkStatusCode(response, expectedStatus = 200) {
        check(response, {
            'Status code check': (r) => r.status === expectedStatus,
        });
    }

    checkResponseTime(response, expectedTime = 900) {
        check(response, {
            'Response time check': (r) => r.timings.duration < expectedTime,
        });
    }

    checkFilmeTitulo(response) {
        check(response, {
            'Titulo presente': (r) => {
                let json = r.json();
                return Array.isArray(json) 
                    ? json.every(item => item.hasOwnProperty('title'))
                    : json.hasOwnProperty('title');
            },
        });
    }

    checkFilmeDescricao(response) {
        check(response, {
            'Descrição presente': (r) => {
                let json = r.json();
                return Array.isArray(json)
                    ? json.every(item => item.hasOwnProperty('description'))
                    : json.hasOwnProperty('description');
            },
        });
    }

    checklaunchdate(response) {
        check(response, {
            'Data de Estreia presente': (r) => {
                let json = r.json();
                return Array.isArray(json)
                    ? json.every(item => item.hasOwnProperty('launchdate'))
                    : json.hasOwnProperty('launchdate');
            },
        });
    }

    checkshowtimes(response) {
        check(response, {
            'Data de exibição presente': (r) => {
                let json = r.json();
                return Array.isArray(json)
                    ? json.every(item => item.hasOwnProperty('showtimes'))
                    : json.hasOwnProperty('showtimes');
            },
        });
    }

    checkId(response) {
        check(response, {
            'Id presente': (r) => {
                let json = r.json();
                return Array.isArray(json)
                    ? json.every(item => item.hasOwnProperty('_id'))
                    : json.hasOwnProperty('_id');
            },
        });
    }

    checkMovieId(response) {
        check(response, {
            'Id do filme presente': (r) => {
                let json = r.json();
                return Array.isArray(json)
                    ? json.every(item => item.hasOwnProperty('movieId'))
                    : json.hasOwnProperty('movieId');
            },
        });
    }
    checkTicketId(response) {
        check(response, {
            'Id do usuario presente': (r) => {
                let json = r.json();
                return Array.isArray(json)
                    ? json.every(item => item.hasOwnProperty('userId'))
                    : json.hasOwnProperty('userId');
            },
        });
    }


    checkAssento(response) {
        check(response, {
            'Campo assento presente': (r) => {
                let json = r.json();
                return Array.isArray(json)
                    ? json.every(item => item.hasOwnProperty('seatNumber'))
                    : json.hasOwnProperty('seatNumber');
            },
        });
    }

    checkPrice(response) {
        check(response, {
            'Campo preço presente': (r) => {
                let json = r.json();
                return Array.isArray(json)
                    ? json.every(item => item.hasOwnProperty('price'))
                    : json.hasOwnProperty('price');
            },
        });
    }

    checkshowtime(response) {
        check(response, {
            'Data de exibição presente': (r) => {
                let json = r.json();
                return Array.isArray(json)
                    ? json.every(item => item.hasOwnProperty('showtime'))
                    : json.hasOwnProperty('showtime');
            },
        });
    }
}
