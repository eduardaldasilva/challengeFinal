
## Matriz de Resultados dos Testes Não Funcionais

### Smoke (Teste de Fumaça) - CP1

| **Teste**        | **Descrição**                           | **REQUISITOS**                                  | **CHECKS**                                    | **Status** | **Resultado Obtido** | **PDF do Relatório**                          |
|------------------|-----------------------------------------|------------------------------------------------|----------------------------------------------|------------|-----------------------|-----------------------------------------------|
| CP1.1            | GET/movies/{id}                         | Status code 200                                | checkStatusCode                              | ✅      | [Resultado](#)       | [reportGetIdSmoke.pdf](challengeDocs/reportsNaoFuncionais/movies/reportGetIdSmoke.pdf) |
| CP1.2            | GET/tickets                             | Status code 200                                | checkStatusCode                              | ✅      | [Resultado](#)       | [reportGetSmoke.pdf](challengeDocs/reportsNaoFuncionais/tickets/reportGetSmoke.pdf) |
| CP1.3            | POST/tickets                            | Status code 201                                | checkStatusCode                              | ✅      | [Resultado](#)       | [reportPostSmoke.pdf](challengeDocs/reportsNaoFuncionais/tickets/reportPostSmoke.pdf) |
| Fluxo Completo   | POST/movies, GET/movies, GET/movies/{id}, PUT/movies/{id}, POST/tickets, GET/tickets, DELETE/movies/{id} | Status code 200 para GET, 201 para POST e PUT, 200 para DELETE | checkStatusCode | ❌      | [Resultado](#)       | [reportFluxoSmoke.pdf](challengeDocs/reportsNaoFuncionais/reportFluxoSmoke.pdf) |

### Spike (Teste de Pico) - CP2

| **Teste**        | **Descrição**                           | **REQUISITOS**                                  | **CHECKS**                                    | **Status** | **Resultado Obtido** | **PDF do Relatório**                          |
|------------------|-----------------------------------------|------------------------------------------------|----------------------------------------------|------------|-----------------------|-----------------------------------------------|
| CP2.1            | GET/movies                              | Status code 200                                | checkStatusCode                              | ❌      | [Resultado](#)       | [reportGetSpike.pdf](challengeDocs/reportsNaoFuncionais/movies/reportGetSpike.pdf) |
| CP2.2            | GET/tickets                             | Status code 200                                | checkStatusCode                              | ❌      | [Resultado](#)       | [reportGetSpike.pdf](challengeDocs/reportsNaoFuncionais/tickets/reportGetSpike.pdf) |
| CP2.3            | POST/tickets                            | Status code 201                                | checkStatusCode                              | ❌      | [Resultado](#)       | [reportPostSpike.pdf](challengeDocs/reportsNaoFuncionais/tickets/reportPostSpike.pdf) |
| Fluxo Completo   | POST/movies, GET/movies, GET/movies/{id}, PUT/movies/{id}, POST/tickets, GET/tickets, DELETE/movies/{id} | Status code 200 para GET, 201 para POST e PUT, 200 para DELETE | checkStatusCode, checkRequestRate | ❌      | [Resultado](#)       | [reportFluxoSpike.pdf](challengeDocs/reportsNaoFuncionais/reportFluxoSpike.pdf) |

### Load (Teste de Carga) - CP3

| **Teste**        | **Descrição**                           | **REQUISITOS**                                  | **CHECKS**                                    | **Status** | **Resultado Obtido** | **PDF do Relatório**                          |
|------------------|-----------------------------------------|------------------------------------------------|----------------------------------------------|------------|-----------------------|-----------------------------------------------|
| CP3.1            | PUT/movies/{id}                         | Status code 200                                | checkStatusCode                              | ✅      | [Resultado](#)       | [reportPutLoad.pdf](challengeDocs/reportsNaoFuncionais/tickets/reportPostLoad.pdf) |
| CP3.2            | GET/tickets                             | Status code 200                                | checkStatusCode                              | ✅      | [Resultado](#)       | [reportGetLoad.pdf](challengeDocs/reportsNaoFuncionais/tickets/reportGetLoad.pdf) |
| CP3.3            | POST/tickets                            | Status code 201                                | checkStatusCode                              | ✅      | [Resultado](#)       | [reportPostLoad.pdf](challengeDocs/reportsNaoFuncionais/tickets/reportPostLoad.pdf) |
| Fluxo Completo   | POST/movies, GET/movies, GET/movies/{id}, PUT/movies/{id}, POST/tickets, GET/tickets, DELETE/movies/{id} | Status code 200 para GET, 201 para POST e PUT, 200 para DELETE | checkStatusCode | ✅      | [Resultado](#)       | [reportFluxoLoad.pdf](challengeDocs/reportsNaoFuncionais/reportFluxoLoad.pdf) |

### Stress (Teste de Estresse) - CP4

| **Teste**        | **Descrição**                           | **REQUISITOS**                                  | **CHECKS**                                    | **Status** | **Resultado Obtido** | **PDF do Relatório**                          |
|------------------|-----------------------------------------|------------------------------------------------|----------------------------------------------|------------|-----------------------|-----------------------------------------------|
| CP4.1            | DELETE/movies/{id}                      | Status code 200                                | checkStatusCode                              | ❌      | [Resultado](#)       | [reportDeleteStress.pdf](challengeDocs/reportsNaoFuncionais/movies/reportDeleteStress.pdf) |
| CP4.2            | GET/tickets                             | Status code 200                                | checkStatusCode                              | ❌      | [Resultado](#)       | [reportGetStress.pdf](challengeDocs/reportsNaoFuncionais/tickets/reportGetStress.pdf) |
| CP4.3            | POST/tickets                            | Status code 201                                | checkStatusCode                              | ❌      | [Resultado](#)       | [reportPostStress.pdf](challengeDocs/reportsNaoFuncionais/tickets/reportPostStress.pdf) |
| Fluxo Completo   | POST/movies, GET/movies, GET/movies/{id}, PUT/movies/{id}, POST/tickets, GET/tickets, DELETE/movies/{id} | Status code 200 para DELETE, 200 para GET, 201 para POST e PUT | checkStatusCode | ❌      | [Resultado](#)       | [reportFluxoStress.pdf](challengeDocs/reportsNaoFuncionais/reportFluxoStress.pdf) |

### Soak (Teste de Resistência) - CP5

| **Teste**        | **Descrição**                           | **REQUISITOS**                                  | **CHECKS**                                    | **Status** | **Resultado Obtido** | **PDF do Relatório**                          |
|------------------|-----------------------------------------|------------------------------------------------|----------------------------------------------|------------|-----------------------|-----------------------------------------------|
| CP5.1            | PUT/movies/{id}                         | Status code 200                                | checkStatusCode                              | ✅      | [Resultado](#)       | [reportPutSoak.pdf](challengeDocs/reportsNaoFuncionais/tickets/reportPostSoak.pdf) |
| CP5.2            | GET/tickets                             | Status code 200                                | checkStatusCode                              | ✅      | [Resultado](#)       | [reportGetSoak.pdf](challengeDocs/reportsNaoFuncionais/tickets/reportGetSoak.pdf) |
| CP5.3            | POST/tickets                            | Status code 201                                | checkStatusCode                              | ✅      | [Resultado](#)       | [reportPostSoak.pdf](challengeDocs/reportsNaoFuncionais/tickets/reportPostSoak.pdf) |
| Fluxo Completo   | POST/movies, GET/movies, GET/movies/{id}, PUT/movies/{id}, POST/tickets, GET/tickets, DELETE/movies/{id} | Status code 200 para DELETE, 200 para GET, 201 para POST e PUT | checkStatusCode | ✅      | [Resultado](#)       | [reportFluxoSoak.pdf](challengeDocs/reportsNaoFuncionais/reportFluxoSoak.pdf) |

