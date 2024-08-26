# Testes não funcionais:

Esses testes verificam o desempenho da API em situações como de estresse, picos de carga, entre outros. O objetivo é avaliar como a API se comporta quando múltiplos usuários realizam ações simultaneamente, garantindo que ela mantenha a estabilidade e a performance esperada sob condições extremas.

---
## Rota Movies

---
#### Métricas e Thresholds e Checks monitorados:


| ENDPOINT | HTTP VERBO | THRESHOLD | REQUISITOS | CHECKS |
| ----- | ----- | ----- | ----- | ----- |
| /movies | POST | p(95)\<200 | Tempo médio de resposta ≤ 200ms | `checkStatusCode`, `checkResponseTime` |
|  |  | **`rate<0.05`** | **Taxa de falhas \< 5%** | **`checkFailureRate`** |
| /movies | GET | p(95)\<100 | Tempo médio de resposta ≤ 100ms | `checkStatusCode`, `checkResponseTime`,
|  |  | **`rate<0.05`** | **Taxa de falhas \< 5%** | **`checkFailureRate`** |`checkPagination` |
| /movies/{id} | GET | p(95)\<50 | Tempo médio de resposta ≤ 50ms | `checkStatusCode`, `checkResponseTime`, `checkIDPresence` |
|  |  | **`rate<0.05`** | **Taxa de falhas \< 5%** | **`checkFailureRate`** |
| /movies/{id} | PUT | p(95)\<300 | Tempo médio de resposta ≤ 300ms | `checkStatusCode`, `checkResponseTime` |
|  |  | **`rate<0.05`** | **Taxa de falhas \< 5%** | **`checkFailureRate`** |
| /movies/{id} | DELETE | p(95)\<400 | Tempo médio de resposta ≤ 400ms | `checkStatusCode`, `checkResponseTime` |
|  |  | **`rate<0.05`** | **Taxa de falhas \< 5%** | **`checkFailureRate`** |

---
## Rota Tickets

---
#### Métricas e Thresholds e Checks monitorados:

| ENDPOINT | HTTP VERBO | THRESHOLD | REQUISITOS | CHECKS |
| ----- | ----- | ----- | ----- | ----- |
| **/tickets** | **POST** | **p(95)\<300** | **Tempo médio de resposta ≤ 300ms** | **`checkStatusCode`, `checkResponseTime`** |
|  |  | **`count>50`** | **Processar pelo menos 50 solicitações por segundo** | **`checkRequestRate`** |
|  |  | **`rate<0.05`** | **Taxa de falhas \< 5%** | **`checkFailureRate`** |
| **/tickets** | **GET** | **p(95)\<1000** | **Tempo médio de resposta ≤ 1000ms** | **`checkStatusCode`, `checkResponseTime`** |
|  |  | **`rate<0.05`** | **Taxa de falhas \< 5%** | **`checkFailureRate`** |
| **/tickets/{id}** | **GET** | **p(95)\<100** | **Tempo médio de resposta ≤ 100ms** | **`checkStatusCode`, `checkResponseTime`, `checkIDPresence`** |
|  |  | **`rate<0.05`** | **Taxa de falhas \< 5%** | **`checkFailureRate`** |
| **/tickets/{id}** | **PUT** | **p(95)\<300** | **Tempo médio de resposta ≤ 300ms** | **`checkStatusCode`, `checkResponseTime`, `checkIDPresence`** |
|  |  | **`rate<0.05`** | **Taxa de falhas \< 5%** | **`checkFailureRate`** |
| **/tickets/{id}** | **DELETE** | **p(95)\<400** | **Tempo médio de resposta ≤ 400ms** | **`checkStatusCode`, `checkResponseTime`, `checkIDPresence`** |
|  |  | **`rate<0.05`** | **Taxa de falhas \< 5%** | **`checkFailureRate`** |

---
#### Testes individuais:

##### Smoke (Teste de fumaça)- CT12: 

Ver se a API está operando de acordo, com um número pequeno de Usuários.



- CT12.1 - GET/movies/{id}
- CT12.2 - GET/tickets/{id}
- CT12.3 - **Fluxo usuário comum:** GET/movies, POST/tickets, PUT/tickets e GET/tickets/{id}
- CT12.4 - **Fluxo usuário administrador:** POST/movies, PUT/movies, GET/movies/{id}, DELETE/movies

```
  smoke: {
            vus: 3, // pequeno número de usuarios
            duration: '1m', // curto periodo de tempo
}
```

##### Spike (Teste de pico) - CT13: 

Simular a API em uma situação de pico, com muitos usuários acessando ao mesmo tempo, portanto, usando stages.

- CT13.1 - GET/movies
- CT13.2 - GET/tickets
- CT13.3 - **Fluxo usuário comum:** GET/movies, POST/tickets, PUT/tickets e GET/tickets/{id}
- CT13.4 - **Fluxo usuário administrador:** POST/movies, PUT/movies, GET/movies/{id}, DELETE/movies

```
stages: [
    { duration: '2m', target: 2000 }, // fazer um ramp-up para 2000 vus
    { duration: '1m', target: 0 }, // e então um ramp-down para 0 vus
  ],
```

##### Load (Teste de carga)- CT14:

Testar a API  com o número esperado em um dia comum de usuarios.

- CT14.1 - PUT/movies/{id}
- CT14.2 -PUT/tickets/{id}
- CT14.3 -**Fluxo usuário comum:** GET/movies, POST/tickets, PUT/tickets e GET/tickets/{id}
- CT14.4 -**Fluxo usuário administrador:** POST/movies, PUT/movies, GET/movies/{id}, DELETE/movies

```
stages: [
                { duration: '3m', target: 100 },
                { duration: '5m', target: 100 },
                { duration: '3m', target: 0 },
            ]
```

##### Stress (Teste de estresse) - CT15:

Testar a API com um número 100% maior de vus do que o teste de carga.

- CT15.1 - DELETE/movies/{id}
- CT15.2 - DELETE/tickets/{id}
- CT15.3 - **Fluxo usuário comum:** GET/movies, POST/tickets, PUT/tickets e GET/tickets/{id}
- CT15.4 - **Fluxo usuário administrador:** POST/movies, PUT/movies, GET/movies/{id}, DELETE/movies

```
 stages: [
                { duration: '3m', target: 200 },
                { duration: '5m', target: 200 },
                { duration: '3m', target: 0 },
            ],
```


##### Soak (Teste de resitência) - CT16:

Testa a API por um tempo mais prolongado, mas com os mesmos vus e ramp-up e ramp-down do teste de carga.

- CT16.1 - POST/movies
- CT16.2 - POST/tickets
- CT16.3 - **Fluxo usuário comum:** GET/movies, POST/tickets, PUT/tickets e GET/tickets/{id}
- CT16.4 - **Fluxo usuário administrador:** POST/movies, PUT/movies, GET/movies/{id}, DELETE/movies

```
stages: [
                { duration: '3m', target: 100 },
                { duration: '10m', target: 100 },
                { duration: '3m', target: 0 },
            ]
```




