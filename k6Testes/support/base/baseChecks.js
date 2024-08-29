import { check } from 'k6';

export class BaseChecks {
    checkStatusCode(response, expectedStatus) {
        return check(response, {
            [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
        });
    }
    
    checkFilmeTitulo(response) {
        check(response, {
            'Titulo presente': (r) => r.json().hasOwnProperty('title'),
        });
    }

    checkFilmeDescricao(response) {
        check(response, {
            'Descrição presente': (r) => r.json().hasOwnProperty('description'),
        });
    }

    checklaunchdate(response) {
        check(response, {
            'Data de Estreia presente': (r) => r.json().hasOwnProperty('launchdate'),
        });
    }

    checkshowtimes(response) {
        check(response, {
            'Data de exibição presente': (r) => r.json().hasOwnProperty('showtimes'),
        });
    }

    checkId(response) {
        check(response, {
            'Id presente': (r) => r.json().hasOwnProperty('_id'),
        });
    }

    checkUserId(response) {
        check(response, {
            'Id do usuário presente': (r) => {
                let json = r.json();
                return Array.isArray(json)
                    ? json.every(item => item.hasOwnProperty('userId'))
                    : json.hasOwnProperty('userId');
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
    checkTamanho(res, expectedCount = 20) {
        const response = JSON.parse(res.body);
    }

    checkResponseTime(response, expectedTime = 900) {
        check(response, {
            'response time check': (r) => r.timings.duration < expectedTime,
        })
    }
}
