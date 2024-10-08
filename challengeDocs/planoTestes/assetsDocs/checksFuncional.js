import { check } from 'k6';

export class BaseChecks {
    checkStatusCode(response, expectedStatus) {
        return check(response, {
            [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
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
