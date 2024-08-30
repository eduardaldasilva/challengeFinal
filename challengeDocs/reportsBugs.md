
# 📊 REPORT DE BUGS E MELHORIAS - API Cinema


## FUNCIONAIS:

| Caso de Teste | Status | Imagens | Resultado Obtido |
|---------------|--------|---------|------------------|
| CF2#1         | 🔴      | <img src="../challengeDocs/reportsFuncionaisMovies/postCF2-1.png" width="200" height="200"> | /movies - Bug: POST retornou status code 201, mas não retornou o ID no corpo da resposta. |
| CF3#6         | 🔴      | <img src="../challengeDocs/reportsFuncionaisMovies/postCF3-6.png" width="200" height="200"> | /movies - Bug: POST aceitou criar dois filmes duplicados e retornou status code 201, vinculando IDs diferentes para cada. |
| CF5#1         | 🟡      | <img src="../challengeDocs/reportsFuncionaisMovies/putCF5-1.png" width="200" height="200"> | /movies - Melhoria: PUT/ID retornou status code 200, mas o Swagger relatava como 201 e não tem o campo para atualizar os dados. |
| CF6#5         | 🔴      | <img src="../challengeDocs/reportsFuncionaisMovies/putCF6-5.png" width="200" height="200"> | /movies - Bug: PUT/ID aceitou campos obrigatórios ausentes e retornou status code 200. |
| CF6#6         | 🔴      | <img src="../challengeDocs/reportsFuncionaisMovies/putCF6-6.png" width="200" height="200"> | /movies - Bug: PUT/ID aceitou campos obrigatórios vazios e retornou status code 200. |
| CF7#1         | 🟡      | <img src="../challengeDocs/reportsFuncionaisMovies/deleteCF7-1.png" width="200" height="200"> | /movies - Melhoria: DELETE/ID retornou status code 200 e deletou com ID válido, mas deveria retornar 204. No Swagger, relatava como 201. |
| CF9#1         | 🔴      | <img src="../challengeDocs/reportsFuncinaisTickets/postCF9-1.png" width="200" height="200"> | /tickets - Bug: POST aceitou valores de assento como 100 e -1, com mensagem incorreta sobre o intervalo permitido. User story pedia 0> e >99. |
| CF9#2         | 🔴      | <img src="../challengeDocs/reportsFuncinaisTickets/postCF9-2.png" width="200" height="200"> | /tickets - Bug: POST aceitou valores como 61 e -1, com mensagem incorreta sobre o intervalo permitido. User story pedia entre 0 e 60. |
| CF9#8         | 🔴      | <img src="../challengeDocs/reportsFuncinaisTickets/postCF9-8.png" width="200" height="200"> | /tickets - Bug: PUT/ID aceitou campos obrigatórios ausentes e retornou status code 200. O restante foi 400. |
| CF9#9         | 🔴      | <img src="../challengeDocs/reportsFuncinaisTickets/postCF9-9.png" width="200" height="200"> | /tickets - Bug: PUT/ID aceitou campos obrigatórios vazios e retornou status code 200. O restante foi 400. |
| CF9#10        | 🔴      | <img src="../challengeDocs/reportsFuncinaisTickets/postCF9-10.png" width="200" height="200"> | /tickets - Bug: PUT/ID aceitou campos ID do movie e do user inválidos, retornando status code 201. |
| CF9#11        | 🔴      | <img src="../challengeDocs/reportsFuncinaisTickets/postCF9-11.png" width="200" height="200"> | /tickets - Bug: PUT/ID aceitou duplicação de tickets, retornou status code 201. |
| CF11#1        | 🔴      | <img src="../challengeDocs/reportsFuncinaisTickets/getIDCF11-1.png" width="200" height="200"> | /tickets - Bug: GET/ID deu falha no sistema. |
| CF12#1        | 🔴      | <img src="../challengeDocs/reportsFuncionaisMovies/putCF12-1.png" width="200" height="200"> | /tickets - Bug: PUT/ID deu falha no sistema. |
| CF13#1        | 🔴      | <img src="../challengeDocs/reportsFuncinaisTickets/deleteCF13-1.png" width="200" height="200"> | /tickets - Bug: DELETE/ID deu falha no sistema. |


## NÃO FUNINCIONAIS:

- Smoke (Teste de Fumaça) - CP1
CP1.1: O tempo médio de resposta para GET/movies/{id} excedeu 2000 milissegundos, com um tempo médio de 1.17s.
CP1.3: O teste para POST/tickets falhou em processar a quantidade requerida de solicitações por segundo e também não atendeu ao limite de tempo médio de resposta de 300 milissegundos.
Fluxo Completo: Houve um problema com o código de status esperado. 38 requisições retornaram status 200 em vez de 201, levando a uma taxa de sucesso de 65%.

---

- Spike (Teste de Pico) - CP2

CP2.1: Falhou na paginação de resultados para GET/movies e não atendeu ao requisito de resposta em menos de 100 milissegundos.
CP2.3: O teste para POST/tickets não conseguiu processar a quantidade esperada de solicitações por segundo e excedeu o limite de tempo de resposta de 300 milissegundos.

---
- Load (Teste de Carga) - CP3
CP3.1: O teste para PUT/movies/{id} falhou em processar a quantidade esperada de solicitações por segundo e excedeu o tempo médio de resposta de 300 milissegundos.

---

- Stress (Teste de Estresse) - CP4
CP4.1: O teste para DELETE/movies/{id} não conseguiu processar a quantidade esperada de solicitações por segundo e excedeu o tempo médio de resposta de 400 milissegundos.
CP4.3: O teste para POST/tickets não atendeu ao requisito de processar 50 solicitações por segundo e excedeu o tempo médio de resposta de 300 milissegundos.
