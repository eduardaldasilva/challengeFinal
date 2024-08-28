# Testes Funcionais:
---
## Rota /movies

### Estrutura do Objeto Movie

- **title**: `string`  
  Descrição: Título do filme.  
  Exemplo: "Filme 1"

- **description**: `string`  
  Descrição: Descrição do filme.  
  Exemplo: "Testando caso de Teste CF2.1"

- **launchdate**: `string($date-time)`  
  Descrição: Data e hora de lançamento do filme no formato ISO 8601.  
  Formato: `yyyy-mm-ddThh:mm:ssZ`  
  Exemplo: "2024-08-23T15:53:13Z"

- **showtimes**: `[string]`  
  Descrição: Lista de datas e horas em que o filme será exibido, no formato ISO 8601.  
  Exemplo: ["2024-08-23T19:00:00Z", "2024-08-24T21:30:00Z"]

### Cenário CF1 - Listar todos os filmes

- **Método HTTP**: GET  
- **Endpoint**: /movies

#### Critérios de Aceitação

- O sistema deve retornar uma lista de todos os filmes cadastrados.
- Os filmes devem ter ID e nome únicos, além dos seguintes campos:

  ```json
  [
    {
      "title": "string",
      "description": "string",
      "launchdate": "2024-08-23T14:17:10.729Z",
      "showtimes": [
        "string"
      ],
      "_id": "kcZXKq3NE511Xxja"
    }
  ]
  ```

#### Caso de Teste CF1.1

**Objetivo**: Verificar se a API retorna a lista de todos os filmes disponíveis no momento.  
**Parâmetros**: Nenhum.  
**Método HTTP**: GET  
**Endpoint**: /movies  
**Resultado Esperado**: 
- **Check Status Code**: 200  
- **Resposta**: Filmes listados com sucesso  
- **Response body**: Lista JSON com os seguintes campos obrigatórios e seus respectivos tipos de dados:

  ```json
  {
    "title": "string",
    "description": "string",
    "launchdate": "string($date-time)",
    "showtimes": ["string"]
  }
  ```

### Cenário CF2 - Criar um novo filme (Caminho Feliz)

- **Método HTTP**: POST  
- **Endpoint**: /movies

#### Campos a Serem Testados

- **title** (`string`) - obrigatório  
- **description** (`string`) - obrigatório  
- **launchdate** (`string`, formato $date-time) - obrigatório  
- **showtimes** (`array de strings`, formato $date-time) - obrigatório

#### Critérios de Aceitação

- Somente usuários administradores devem conseguir fazer ações POST /movies.
- A API deve aceitar e processar corretamente um objeto Movie com todos os campos no formato válido.
- O título deve ser único.
- Se as primeiras validações passarem, deve retornar um ID único.
- A API deve retornar um erro (400 Bad Request) se qualquer campo obrigatório estiver ausente ou for do tipo incorreto.
- A API deve garantir que os campos title e description sejam do tipo string.
- A API deve garantir que o campo launchdate e os elementos do array showtimes estejam no formato $date-time.

#### Caso de Teste CF2.1

**Objetivo**: Verificar se o sistema valida os campos obrigatórios e a unicidade do título e então retorna Status code 201 Created e ID único vinculado ao filme.  
**Passos**: Criar um filme com os campos obrigatórios preenchidos e no formato de lista JSON, respeitando os seguintes tipos de dados:

  ```json
  {
    "title": "string",
    "description": "string",
    "launchdate": "string($date-time)",
    "showtimes": ["string"]
  }
  ```

**Request Body**:

```json
{
  "title": "Filme 1",
  "description": "Testando caso de Teste CF2.1",
  "launchdate": "2024-08-25T14:24:36.543Z",
  "showtimes": [
    "2024-08-31T19:00:00Z",
    "2024-08-30T21:30:00Z"
  ]
}
```

**Parâmetros**: Nenhum.  
**Método HTTP**: POST  
**Endpoint**: /movies  
**Resultado Esperado**: 
- **Check Status Code**: 201  
- **Check ID**: Retorno de um ID único, atribuído ao filme.  
- **Resposta**: Filme criado com sucesso.  
- **Response body**: Nenhum.

### Cenário CF3 - Criar um novo filme (Caminhos alternativos)

**Método HTTP**: POST  
**Endpoint**: /movies  

**Objetivo**: Verificar se o sistema valida os campos obrigatórios preenchidos com tipos de dados diferentes dos casos de aceitação do Cenário Feliz.

**Parâmetros**: Nenhum.  
**Método HTTP**: POST  
**Endpoint**: /movies  
**Resultado Esperado**: 
- **Check Status Code**: 400  
- **Check ID**: Não deve retornar  
- **Resposta**: Requisição inválida.  
- **Response body**: Nenhum.

#### Caso de Teste CF3.1

**Descrição**: Fluxo para testar validação do campo `title` com dados incorretos.

**Passos**:

- **Função 1**: Campo `title` como número  
  Entrada: `"title": 123`

- **Função 2**: Campo `title` como booleano  
  Entrada: `"title": true`

- **Função 3**: Campo `title` como array  
  Entrada: `"title": ["Título 1"]`

- **Função 4**: Campo `title` como objeto  
  Entrada: `"title": {"text": "Filme 1"}`

#### Caso de Teste CF3.2

**Descrição**: Fluxo para testar validação do campo `description` com dados incorretos.

**Passos**:

- **Função 1**: Campo `description` como número  
  Entrada: `"description": 456`

- **Função 2**: Campo `description` como booleano  
  Entrada: `"description": false`

- **Função 3**: Campo `description` como array  
  Entrada: `"description": ["Descrição"]`

- **Função 4**: Campo `description` como objeto  
  Entrada: `"description": {"text": "Descrição"}`

#### Caso de Teste CF3.3

**Descrição**: Fluxo para testar validação do campo `launchdate` com dados incorretos.

**Passos**:

- **Função 1**: Campo `launchdate` como string simples  
  Entrada: `"launchdate": "2024-08-25"`

- **Função 2**: Campo `launchdate` como string com formato incorreto  
  Entrada: `"launchdate": "25-08-2024T14:24:36"`

- **Função 3**: Campo `launchdate` como número  
  Entrada: `"launchdate": 1629890400`

- **Função 4**: Campo `launchdate` como booleano  
  Entrada: `"launchdate": true`

#### Caso de Teste CF3.4

**Descrição**: Fluxo para testar validação do campo `showtimes` com dados incorretos.

**Passos**:

- **Função 1**: Campo `showtimes` com strings fora do formato $date-time  
  Entrada: `"showtimes": ["2024-08-31", "19:00:00"]`

- **Função 2**: Campo `showtimes` com números no lugar de strings  
  Entrada: `"showtimes": [1629890400, 1629890401]`

- **Função 3**: Campo `showtimes` com booleanos no lugar de strings  
  Entrada: `"showtimes": [true, false]`

- **Função 4**: Campo `showtimes` com array vazia  
  Entrada: `"showtimes": []`

- **Função 5**: Campo `showtimes` como null  
  Entrada: `"showtimes": null`

#### Caso de Teste CF3.5

**Descrição**: Fluxo para testar os campos obrigatórios ausentes.

**Passos**:

- **Função 1**: Campo `title` ausente  
  Entrada: `{"description": "Descrição", "launchdate": "2024-08-25T14:24:36.543Z", "showtimes": ["2024-08-31T19:00:00Z"]}`

- **Função 2**: Campo `description` ausente  
  Entrada: `{"title": "Filme 1", "launchdate": "2024-08-25T14:24:36.543Z", "showtimes": ["2024-08-31T19:00:00Z"]}`

- **Função 3**: Campo `launchdate` ausente  
  Entrada: `{"title": "Fil

me 1", "description": "Descrição", "showtimes": ["2024-08-31T19:00:00Z"]}`

- **Função 4**: Campo `showtimes` ausente  
  Entrada: `{"title": "Filme 1", "description": "Descrição", "launchdate": "2024-08-25T14:24:36.543Z"}`

#### Caso de Teste CF3.6

**Descrição**: Fluxo para testar duplicação de título.

**Passos**:

- **Função 1**: Criar um filme com o mesmo título que já existe no banco de dados  
  Entrada: `{"title": "Filme 1", "description": "Descrição Duplicada", "launchdate": "2024-08-26T14:24:36.543Z", "showtimes": ["2024-08-31T19:00:00Z"]}`

- **Função 2**: Verificar se o sistema retorna erro de título duplicado

#### Caso de Teste CF3.7 
**Descrição:** Fluxo para testar a presença de campos vazios.

**Passos:**

- **Função 1:** Campo `title` vazio  
**Entrada:** `{"title": "", "description": "Descrição", "launchdate": "2024-08-25T14:24:36.543Z", "showtimes": ["2024-08-31T19:00:00Z"]}`  
**Verificação:** Confirmar que a resposta indica um erro devido ao campo `title` vazio.

- **Função 2:** Campo `description` vazio  
**Entrada:** `{"title": "Filme 1", "description": "", "launchdate": "2024-08-25T14:24:36.543Z", "showtimes": ["2024-08-31T19:00:00Z"]}`  
**Verificação:** Confirmar que a resposta indica um erro devido ao campo `description` vazio.

- **Função 3:** Campo `launchdate` vazio  
**Entrada:** `{"title": "Filme 1", "description": "Descrição", "launchdate": "", "showtimes": ["2024-08-31T19:00:00Z"]}`  
**Verificação:** Confirmar que a resposta indica um erro devido ao campo `launchdate` vazio.

- **Função 4:** Campo `showtimes` vazio  
**Entrada:** `{"title": "Filme 1", "description": "Descrição", "launchdate": "2024-08-25T14:24:36.543Z", "showtimes": []}`  
**Verificação:** Confirmar que a resposta indica um erro devido ao campo `showtimes` vazio.

### Cenário CF4 - Buscar um filme específico

- **Método HTTP**: GET  
- **Endpoint**: /movies/{id}

#### Critérios de Aceitação

- O sistema deve retornar os detalhes do filme com o ID especificado.
- O ID deve existir no banco de dados.
- Se o ID não existir, deve retornar um erro 404.

#### Caso de Teste CF4.1

**Objetivo**: Verificar se o sistema retorna os detalhes do filme com o ID especificado.  
**Passos**:

- **Função 1**: Buscar filme com ID válido.  
  Entrada: `/movies/{id}` (onde {id} é um ID existente)  
  **Resultado Esperado**:  
  - **Check Status Code**: 200  
  - **Resposta**: Detalhes do filme  
  - **Response body**: 

    ```json
    {
      "title": "Filme 1",
      "description": "Testando caso de Teste CF2.1",
      "launchdate": "2024-08-23T14:24:36.543Z",
      "showtimes": ["2024-08-31T19:00:00Z", "2024-08-30T21:30:00Z"],
      "_id": "kcZXKq3NE511Xxja"
    }
    ```

#### Caso de Teste CF4.2

**Objetivo**: Verificar se o sistema retorna erro ao buscar um filme com um ID que não existe.  
**Passos**:

- **Função 1**: Buscar filme com um ID inexistente.  
  Entrada: `/movies/{id}` (onde {id} é um ID que não existe)  
  **Resultado Esperado**:  
  - **Check Status Code**: 404  
  - **Resposta**: Filme não encontrado  
  - **Response body**: 

    ```json
    {
      "message": "Filme não encontrado"
    }
    ```

### Cenário CF5 - Atualizar um filme existente

- **Método HTTP**: PUT  
- **Endpoint**: /movies/{id}

#### Critérios de Aceitação

- O sistema deve permitir atualizar um filme existente com os novos dados fornecidos.
- O ID deve existir no banco de dados.
- Se o ID não existir, deve retornar um erro 404.

#### Caso de Teste CF5.1

**Objetivo**: Verificar se o sistema atualiza um filme existente com os novos dados fornecidos.  
**Passos**:

- **Função 1**: Atualizar filme com ID existente.  
  Entrada: `/movies/{id}` (onde {id} é um ID existente)  
  **Request Body**: 

  ```json
  {
    "title": "Filme Atualizado",
    "description": "Descrição Atualizada",
    "launchdate": "2024-08-27T14:24:36.543Z",
    "showtimes": ["2024-08-31T20:00:00Z"]
  }
  ```

  **Resultado Esperado**:  
  - **Check Status Code**: 200  
  - **Resposta**: Filme atualizado com sucesso  
  - **Response body**: 

    ```json
    {
      "title": "Filme Atualizado",
      "description": "Descrição Atualizada",
      "launchdate": "2024-08-27T14:24:36.543Z",
      "showtimes": ["2024-08-31T20:00:00Z"],
      "_id": "kcZXKq3NE511Xxja"
    }
    ```

#### Caso de Teste CF5.2

**Objetivo**: Verificar se o sistema retorna erro ao tentar atualizar um filme com um ID que não existe.  
**Passos**:

- **Função 1**: Atualizar filme com ID inexistente.  
  Entrada: `/movies/{id}` (onde {id} é um ID que não existe)  
  **Request Body**: 

  ```json
  {
    "title": "Filme Inexistente",
    "description": "Descrição Inexistente",
    "launchdate": "2024-08-28T14:24:36.543Z",
    "showtimes": ["2024-08-31T21:00:00Z"]
  }
  ```

  **Resultado Esperado**:  
  - **Check Status Code**: 404  
  - **Resposta**: Filme não encontrado  
  - **Response body**: 

    ```json
    {
      "message": "Filme não encontrado"
    }
    ```

    ### Cenário CF6 - Atualizar um filme (Caminhos alternativos)

**Método HTTP**: PUT  
**Endpoint**: /movies  

**Objetivo**: Verificar se o sistema valida os campos obrigatórios preenchidos com tipos de dados diferentes dos casos de aceitação do Cenário Feliz.

**Parâmetros**: Nenhum.  
**Método HTTP**: POST  
**Endpoint**: /movies  
**Resultado Esperado**: 
- **Check Status Code**: 400  
- **Check ID**: Não deve retornar  
- **Resposta**: Requisição inválida.  
- **Response body**: Nenhum.

#### Caso de Teste CF6.1

**Descrição**: Fluxo para testar validação do campo `title` com dados incorretos.

**Passos**:

- **Função 1**: Campo `title` como número  
  Entrada: `"title": 123`

- **Função 2**: Campo `title` como booleano  
  Entrada: `"title": true`

- **Função 3**: Campo `title` como array  
  Entrada: `"title": ["Título 1"]`

- **Função 4**: Campo `title` como objeto  
  Entrada: `"title": {"text": "Filme 1"}`

#### Caso de Teste CF6.2

**Descrição**: Fluxo para testar validação do campo `description` com dados incorretos.

**Passos**:

- **Função 1**: Campo `description` como número  
  Entrada: `"description": 456`

- **Função 2**: Campo `description` como booleano  
  Entrada: `"description": false`

- **Função 3**: Campo `description` como array  
  Entrada: `"description": ["Descrição"]`

- **Função 4**: Campo `description` como objeto  
  Entrada: `"description": {"text": "Descrição"}`

#### Caso de Teste CF6.3

**Descrição**: Fluxo para testar validação do campo `launchdate` com dados incorretos.

**Passos**:

- **Função 1**: Campo `launchdate` como string simples  
  Entrada: `"launchdate": "2024-08-25"`

- **Função 2**: Campo `launchdate` como string com formato incorreto  
  Entrada: `"launchdate": "25-08-2024T14:24:36"`

- **Função 3**: Campo `launchdate` como número  
  Entrada: `"launchdate": 1629890400`

- **Função 4**: Campo `launchdate` como booleano  
  Entrada: `"launchdate": true`

#### Caso de Teste CF6.4

**Descrição**: Fluxo para testar validação do campo `showtimes` com dados incorretos.

**Passos**:

- **Função 1**: Campo `showtimes` com strings fora do formato $date-time  
  Entrada: `"showtimes": ["2024-08-31", "19:00:00"]`

- **Função 2**: Campo `showtimes` com números no lugar de strings  
  Entrada: `"showtimes": [1629890400, 1629890401]`

- **Função 3**: Campo `showtimes` com booleanos no lugar de strings  
  Entrada: `"showtimes": [true, false]`

- **Função 4**: Campo `showtimes` com array vazia  
  Entrada: `"showtimes": []`

- **Função 5**: Campo `showtimes` como null  
  Entrada: `"showtimes": null`

#### Caso de Teste CF6.5

**Descrição**: Fluxo para testar os campos obrigatórios ausentes.

**Passos**:

- **Função 1**: Campo `title` ausente  
  Entrada: `{"description": "Descrição", "launchdate": "2024-08-25T14:24:36.543Z", "showtimes": ["2024-08-31T19:00:00Z"]}`

- **Função 2**: Campo `description` ausente  
  Entrada: `{"title": "Filme 1", "launchdate": "2024-08-25T14:24:36.543Z", "showtimes": ["2024-08-31T19:00:00Z"]}`

- **Função 3**: Campo `launchdate` ausente  
  Entrada: `{"title": "Fil

me 1", "description": "Descrição", "showtimes": ["2024-08-31T19:00:00Z"]}`

- **Função 4**: Campo `showtimes` ausente  
  Entrada: `{"title": "Filme 1", "description": "Descrição", "launchdate": "2024-08-25T14:24:36.543Z"}`

  ### Caso de Teste CF6.6 
**Descrição:** Fluxo para testar a presença de campos vazios.

**Passos:**

- **Função 1:** Campo `title` vazio  
**Entrada:** `{"title": "", "description": "Descrição", "launchdate": "2024-08-25T14:24:36.543Z", "showtimes": ["2024-08-31T19:00:00Z"]}`  
**Verificação:** Confirmar que a resposta indica um erro devido ao campo `title` vazio.

- **Função 2:** Campo `description` vazio  
**Entrada:** `{"title": "Filme 1", "description": "", "launchdate": "2024-08-25T14:24:36.543Z", "showtimes": ["2024-08-31T19:00:00Z"]}`  
**Verificação:** Confirmar que a resposta indica um erro devido ao campo `description` vazio.

- **Função 3:** Campo `launchdate` vazio  
**Entrada:** `{"title": "Filme 1", "description": "Descrição", "launchdate": "", "showtimes": ["2024-08-31T19:00:00Z"]}`  
**Verificação:** Confirmar que a resposta indica um erro devido ao campo `launchdate` vazio.

- **Função 4:** Campo `showtimes` vazio  
**Entrada:** `{"title": "Filme 1", "description": "Descrição", "launchdate": "2024-08-25T14:24:36.543Z", "showtimes": []}`  
**Verificação:** Confirmar que a resposta indica um erro devido ao campo `showtimes` vazio.


### Cenário CF7 - Excluir um filme

- **Método HTTP**: DELETE  
- **Endpoint**: /movies/{id}

#### Critérios de Aceitação

- O sistema deve permitir a exclusão de um filme existente com o ID fornecido.
- O ID deve existir no banco de dados.
- Se o ID não existir, deve retornar um erro 404.

#### Caso de Teste CF7.1

**Objetivo**: Verificar se o sistema exclui um filme existente com o ID fornecido.  
**Passos**:

- **Função 1**: Excluir filme com ID existente.  
  Entrada: `/movies/{id}` (onde {id} é um ID existente)  
  **Resultado Esperado**:  
  - **Check Status Code**: 200  
  - **Resposta**: Filme excluído com sucesso  
  - **Response body**: 

    ```json
    {
      "message": "Filme excluído com sucesso"
    }
    ```

#### Caso de Teste CF7.2

**Objetivo**: Verificar se o sistema retorna erro ao tentar excluir um filme com um ID que não existe.  
**Passos**:

- **Função 1**: Excluir filme com ID inexistente.  
  Entrada: `/movies/{id}` (onde {id} é um ID que não existe)  
  **Resultado Esperado**:  
  - **Check Status Code**: 404  
  - **Resposta**: Filme não encontrado  
  - **Response body**: 

    ```json
    {
      "message": "Filme não encontrado"
    }
    ```

---


---

## Rota /tickets

### Estrutura do Objeto Ticket

>**movieId**: string  
Descrição: Identificador único do filme para o qual o ingresso está reservado.  
Exemplo: "movie123"

>**userId**: string  
Descrição: Identificador único do usuário que está fazendo a reserva.  
Exemplo: "user456"

>**seatNumber**: number  
Descrição: Número do assento reservado. Deve estar no intervalo de 0 a 99.  
Exemplo: 10

>**price**: number  
Descrição: Preço do ingresso. Deve estar no intervalo de 0 a 60.  
Exemplo: 25

>**showtime**: string($date-time)  
Descrição: Data e hora da apresentação do filme no formato ISO 8601.  
Formato: yyyy-mm-ddThh:mm:ssZ  
Exemplo: "2024-08-31T19:00:00Z"

---

### Cenário CF8 - Reservar Ingressos (POST)

**Descrição:** O usuário deseja reservar ingressos para assistir a um filme em um cinema.

##### Caso de Teste CF8.1 - Cenário Feliz

**Passos:**
1. Enviar uma solicitação POST para o endpoint `/tickets` com os seguintes detalhes do ingresso.

**Request Body:**
```json
{
  "movieId": "string",
  "userId": "string",
  "seatNumber": 10,
  "price": 25,
  "showtime": "2024-08-31T19:00:00Z"
}
```

**Resultado Esperado:**
- **Check Status Code:** 201 Created  
- **Resposta:** O sistema deve criar a reserva e retornar o ID da reserva.  
- **Response Body:**
```json
{
  "ticketId": "string"
}
```

##### Caso de Teste CF8.2 - Cenário de Erro: Assento Inválido

**Descrição:** Tentar reservar um ingresso com um número de assento fora do intervalo permitido (0 a 99).

**Passos:**
1. Enviar uma solicitação POST para o endpoint `/tickets` com um número de assento inválido.

**Request Body:**
```json
{
  "movieId": "string",
  "userId": "string",
  "seatNumber": 100,
  "price": 25,
  "showtime": "2024-08-31T19:00:00Z"
}
```

**Resultado Esperado:**
- **Check Status Code:** 400 Bad Request  
- **Resposta:** A requisição deve falhar com uma mensagem indicando que o número do assento é inválido.  
- **Response Body:**
```json
{
  "error": "Número do assento inválido. Deve estar entre 0 e 99."
}
```

##### Caso de Teste CF8.3 - Cenário de Erro: Preço Inválido

**Descrição:** Tentar reservar um ingresso com um preço fora do intervalo permitido (0 a 60).

**Passos:**
1. Enviar uma solicitação POST para o endpoint `/tickets` com um preço inválido.

**Request Body:**
```json
{
  "movieId": "string",
  "userId": "string",
  "seatNumber": 10,
  "price": 65,
  "showtime": "2024-08-31T19:00:00Z"
}
```

**Resultado Esperado:**
- **Check Status Code:** 400 Bad Request  
- **Resposta:** A requisição deve falhar com uma mensagem indicando que o preço do ingresso é inválido.  
- **Response Body:**
```json
{
  "error": "Preço do ingresso inválido. Deve estar entre 0 e 60."
}
```

##### Caso de Teste CF8.4 - Cenário de Erro: Showtime Inválido

**Descrição:** Tentar reservar um ingresso com uma data e hora para a apresentação do filme no formato inválido.

**Passos:**
1. Enviar uma solicitação POST para o endpoint `/tickets` com uma data e hora inválida.

**Request Body:**
```json
{
  "movieId": "string",
  "userId": "string",
  "seatNumber": 10,
  "price": 25,
  "showtime": "2024-08-31 19:00:00"
}
```

**Resultado Esperado:**
- **Check Status Code:** 400 Bad Request  
- **Resposta:** A requisição deve falhar com uma mensagem indicando que a data e hora do showtime estão em formato inválido.  
- **Response Body:**
```json
{
  "error": "Formato de data e hora inválido. Deve ser no formato ISO 8601."
}
```

##### Caso de Teste CF8.5 - Cenário de Erro: Campos Obrigatórios Ausentes

**Descrição:** Tentar reservar um ingresso sem fornecer todos os campos obrigatórios.

**Passos:**
1. Enviar uma solicitação POST para o endpoint `/tickets` sem um ou mais campos obrigatórios.

**Request Body:**
```json
{
  "movieId": "string",
  "userId": "string",
  "seatNumber": 10
}
```

**Resultado Esperado:**
- **Check Status Code:** 400 Bad Request  
- **Resposta:** A requisição deve falhar com uma mensagem indicando que os campos obrigatórios estão ausentes.  
- **Response Body:**
```json
{
  "error": "Campos obrigatórios ausentes. Os campos price e showtime são obrigatórios."
}
```

---

### Cenário CF9 - Consultar Todos os Ingressos (GET)

##### Caso de Teste CF9.1 - Cenário Feliz

**Descrição:** Consultar a lista de todos os ingressos reservados.

**Passos:**
1. Enviar uma solicitação GET para o endpoint `/tickets`.

**Resultado Esperado:**
- **Check Status Code:** 200 OK  
- **Resposta:** O sistema deve retornar uma lista de todos os ingressos reservados.  
- **Response Body:**
```json
{
  "tickets": [
    {
      "ticketId": "string",
      "movieId": "string",
      "userId": "string",
      "seatNumber": 10,
      "price": 25,
      "showtime": "2024-08-31T19:00:00Z"
    }
  ]
}
```

---

### Cenário CF10 - Consultar Ingresso por ID (GET)

##### Caso de Teste CF10.1 - Cenário Feliz

**Descrição:** Consultar um ingresso específico pelo ID.

**Passos:**
1. Enviar uma solicitação GET para o endpoint `/tickets/{id}` onde `{id}` é o ID do ingresso.

**Resultado Esperado:**
- **Check Status Code:** 200 OK  
- **Resposta:** O sistema deve retornar os detalhes do ingresso com o ID especificado.  
- **Response Body:**
```json
{
  "ticketId": "string",
  "movieId": "string",
  "userId": "string",
  "seatNumber": 10,
  "price": 25,
  "showtime": "2024-08-31T19:00:00Z"
}
```

##### Caso de Teste CF10.2 - Cenário de Erro: ID Inválido

**Descrição:** Tentar consultar um ingresso com um ID inválido.

**Passos:**
1. Enviar uma solicitação GET para o endpoint `/tickets/{id}` com um ID inválido.

**Request Path:** `/tickets/invalid-id`

**Resultado Esperado:**
- **Check Status Code:** 404 Not Found  
- **Resposta:** O sistema deve retornar uma mensagem indicando que o ingresso não foi encontrado.  
- **Response Body:**
```json
{
  "error": "Ingresso não encontrado."
}
```

---

### Cenário CF11 - Atualizar Ingresso por ID (PUT)

##### Caso de Teste CF11.1 - Cenário Feliz

**Descrição:** Atualizar os detalhes de um ingresso existente.

**Passos:**
1. Enviar uma solicitação PUT para o endpoint `/tickets/{id}` com os novos detalhes do ingresso.

**Request Body:**
```json
{
  "movieId": "string",
  "userId": "string",
  "seatNumber": 15,
  "price": 30,
  "showtime": "2024-08-31T20:00:00Z"
}
```

**Resultado Esperado:**
- **Check Status Code:** 200 OK  
- **Resposta:** O sistema deve atualizar os detalhes do ingresso e retornar os novos detalhes.  
- **Response Body:**
```json
{
  "ticketId": "string",
  "movieId": "string",
  "userId": "string",
  "seatNumber": 15,
  "price": 30,
  "showtime": "2024-08-31T20:00:00Z"
}
```

##### Caso de Teste CF11.2 - Cenário de Erro: ID Inválido

**Descrição:** Tentar atualizar um ingresso com um ID inválido.

**Passos:**
1. Enviar uma solic

itação PUT para o endpoint `/tickets/{id}` com um ID inválido e novos detalhes.

**Request Path:** `/tickets/invalid-id`

**Request Body:**
```json
{
  "movieId": "string",
  "userId": "string",
  "seatNumber": 15,
  "price": 30,
  "showtime": "2024-08-31T20:00:00Z"
}
```

**Resultado Esperado:**
- **Check Status Code:** 404 Not Found  
- **Resposta:** O sistema deve retornar uma mensagem indicando que o ingresso não foi encontrado.  
- **Response Body:**
```json
{
  "error": "Ingresso não encontrado."
}
```

---

### Cenário CF12 - Cancelar Ingresso (DELETE)

##### Caso de Teste CF12.1 - Cenário Feliz

**Descrição:** Cancelar um ingresso específico pelo ID.

**Passos:**
1. Enviar uma solicitação DELETE para o endpoint `/tickets/{id}` onde `{id}` é o ID do ingresso.

**Resultado Esperado:**
- **Check Status Code:** 200 OK  
- **Resposta:** O sistema deve excluir o ingresso e retornar uma mensagem de sucesso.  
- **Response Body:**
```json
{
  "message": "Ingresso excluído com sucesso."
}
```

##### Caso de Teste CF12.2 - Cenário de Erro: ID Inválido

**Descrição:** Tentar cancelar um ingresso com um ID inválido.

**Passos:**
1. Enviar uma solicitação DELETE para o endpoint `/tickets/{id}` com um ID inválido.

**Request Path:** `/tickets/invalid-id`

**Resultado Esperado:**
- **Check Status Code:** 404 Not Found  
- **Resposta:** O sistema deve retornar uma mensagem indicando que o ingresso não foi encontrado.  
- **Response Body:**
```json
{
  "error": "Ingresso não encontrado."
}
```

---
