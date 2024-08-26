User Story: Reservando Ingressos na API

Ator: Qualquer usuário da API de Ingressos

Cenário: O usuário deseja reservar ingressos para assistir a um filme em um cinema.

Requisitos Funcionais:

- O usuário envia uma solicitação POST para o endpoint /tickets com os seguintes detalhes do ingresso:
- ID do Filme (movieId) - Identifica o filme para o qual o ingresso está sendo reservado.
- ID do Usuário (userId) - Identifica o usuário que está fazendo a reserva.
- Número do Assento (seatNumber) - O número do assento que o usuário deseja reservar.
- Preço do Ingresso (price) - O preço do ingresso para o filme.
- Data de Apresentação (showtime) - A data e hora da apresentação do filme.
- O sistema valida se todos os campos obrigatórios estão preenchidos corretamente.
- O sistema verifica se o número do assento está dentro do intervalo de 0 a 99.
- O sistema verifica se o preço do ingresso está dentro do intervalo de 0 a 60.
- Se todas as validações passarem, o sistema cria uma reserva de ingresso com os detalhes fornecidos.
- O sistema atribui um ID único à reserva de ingresso.
- O sistema retorna uma resposta de sucesso com o status 201 Created, incluindo o ID da reserva de ingresso.

Requisitos Não Funcionais de Performance:

- A API deve ser capaz de processar pelo menos 50 solicitações de reserva de ingressos por segundo.
- O tempo médio de resposta para a reserva de um ingresso não deve exceder 300 milissegundos.