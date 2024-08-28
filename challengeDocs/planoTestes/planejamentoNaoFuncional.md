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

##### Smoke (Teste de fumaça)- CP1: 

Ver se a API está operando de acordo, com um número pequeno de Usuários.



- CP1.1 - GET/movies/{id}
- CP1.2 - GET/tickets
- CP1.3 - POST/tickets
- **Fluxo** POST/movies, GET/movies, GET/movies/{id}, PUT/movies/{id}, POST/tickets, GET/tickets, e DELETE/movies/{id}
```
  smoke: {
            vus: 3, // pequeno número de usuarios
            duration: '20s', // curto periodo de tempo
}
```

##### Spike (Teste de pico) - CP2: 

Simular a API em uma situação de pico, com muitos usuários acessando ao mesmo tempo, portanto, usando stages.

- CP2.1 - GET/movies
- CP2.2 - GET/tickets
- CP2.3 - POST/tickets
- **Fluxo** POST/movies, GET/movies, GET/movies/{id}, PUT/movies/{id}, POST/tickets, GET/tickets, e DELETE/movies/{id}

```
stages: [
    { duration: '2m', target: 2000 }, // fazer um ramp-up para 2000 vus
    { duration: '30s', target: 0 }, // e então um ramp-down para 0 vus
  ],
```

##### Load (Teste de carga)- CP3:

Testar a API  com o número esperado em um dia comum de usuarios.

- CP3.1 - PUT/movies/{id}
- CP3.2 - GET/tickets
- CP3.3 - POST/tickets
- **Fluxo** POST/movies, GET/movies, GET/movies/{id}, PUT/movies/{id}, POST/tickets, GET/tickets, e DELETE/movies/{id}

```
stages: [
                { duration: '1m', target: 100 },
                { duration: '4m', target: 100 },
                { duration: '1m', target: 0 },
            ]
```

##### Stress (Teste de estresse) - CP4:

Testar a API com um número 100% maior de vus do que o teste de carga.

- CP4.1 - DELETE/movies/{id}
- CP4.2 - GET/tickets
- CP4.3 - POST/tickets
- **Fluxo** POST/movies, GET/movies, GET/movies/{id}, PUT/movies/{id}, POST/tickets, GET/tickets, e DELETE/movies/{id}

```
 stages: [
                { duration: '1m', target: 200 },
                { duration: '4m', target: 200 },
                { duration: '1m', target: 0 },
            ],
```


##### Soak (Teste de resitência) - CP5:

Testa a API por um tempo mais prolongado, mas com os mesmos vus e ramp-up e ramp-down do teste de carga.

- CT16.1 - POST/movies
- CP5.2 - GET/tickets
- CP5.3 - POST/tickets
- **Fluxo** POST/movies, GET/movies, GET/movies/{id}, PUT/movies/{id}, POST/tickets, GET/tickets, e DELETE/movies/{id}

```
stages: [
                { duration: '1m', target: 100 },
                { duration: '8m', target: 100 },
                { duration: '1m', target: 0 },
            ]
```




