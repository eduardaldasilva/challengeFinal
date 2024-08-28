import { check } from 'k6';

export class BaseChecks {

    // Verifica se o código de status da resposta é o esperado (200 por padrão)
    checkStatusCode(response, expectedStatus = 200) {
        check(response, {
            'Status code check': (r) => r.status === expectedStatus,
        });
    }

    // Verifica se a propriedade 'title' está presente em todos os itens da resposta JSON
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

    // Verifica se a propriedade 'description' está presente em todos os itens da resposta JSON
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

    // Verifica se a propriedade 'launchdate' está presente em todos os itens da resposta JSON
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

    // Verifica se a propriedade 'showtimes' está presente em todos os itens da resposta JSON
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

    // Verifica se a propriedade '_id' está presente em todos os itens da resposta JSON
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

    // Verifica se a propriedade 'movieId' está presente em todos os itens da resposta JSON
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

    // Verifica se a propriedade 'userId' está presente em todos os itens da resposta JSON
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

    // Verifica se a propriedade 'seatNumber' está presente em todos os itens da resposta JSON
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

    // Verifica se a propriedade 'price' está presente em todos os itens da resposta JSON
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

    // Verifica se a propriedade 'showtime' está presente em todos os itens da resposta JSON
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
