
# **Plano de Testes da API de Cinema** 🎬

## **Resumo** 📝
Este plano de testes tem o objetivo de garantir que a API Cinema funcione conforme o esperado, tanto em aspectos funcionais quanto não funcionais, e identificar quaisquer áreas de melhoria ou possíveis falhas.

## **Entregáveis do Teste** 📦

1. **Relatórios de Teste** 📊
   - Documentação detalhada da execução dos testes.
   - Relatórios gerados pela dashboard do k6, incluindo gráficos e métricas de desempenho.
   - Análise dos resultados dos testes, destacando os casos bem-sucedidos e as falhas, com explicações sobre as causas das falhas.

2. **Matriz de Rastreabilidade** 🔗
   - Documento vinculando o ID de cada caso de teste a informações gerais, como requisitos da API e detalhes das funcionalidades testadas.

3. **Scripts de Teste** 💻
   - Código-fonte dos scripts utilizados para realizar os testes, com comentários e documentação apropriados para facilitar a compreensão e manutenção.

4. **Relatório de Bugs e Melhorias** 🐛
   - **Jira**: Todos os bugs e sugestões de melhorias serão registrados no Jira, permitindo um rastreamento eficaz e gerenciamento de tarefas.
   - **Arquivo de Report de Bugs**: Documento adicional contendo uma lista dos bugs encontrados, suas descrições, e o status de cada um.

## **Rotas Cobertas** 📋

### **/movies** 🎥
   - **POST**: Criação de um novo filme.
   - **GET**: Listagem de todos os filmes.
   - **GET/{ID}**: Recuperação de um filme específico pelo ID.
   - **PUT/{ID}**: Atualização de informações de um filme existente.
   - **DELETE/{ID}**: Exclusão de um filme pelo ID.

### **/tickets** 🎫
   - **POST**: Compra de um novo ingresso.
   - **GET**: Listagem de todos os ingressos.
   - **GET/{ID}**: Recuperação de um ingresso específico pelo ID.
   - **PUT/{ID}**: Atualização das informações de um ingresso existente.
   - **DELETE/{ID}**: Cancelamento de um ingresso pelo ID.

## **Testes Funcionais** ✅

- **Verificação de Criação**: Validar que os métodos POST estão corretamente criando recursos (filmes e ingressos) e retornando os códigos de status e respostas esperadas.
- **Validação de Recuperação**: Garantir que os métodos GET retornam os dados corretos e que a recuperação por ID funciona conforme o esperado.
- **Atualização e Exclusão**: Testar os métodos PUT e DELETE para assegurar que atualizações e exclusões de recursos são realizadas corretamente e que os códigos de resposta são adequados.

## **Testes Não Funcionais** 🚀

- **Testes de Carga (Load Testing)**: Avaliar o desempenho da API sob condições normais de carga para garantir que ela responde dentro dos limites aceitáveis. Isso ajuda a entender o comportamento da API em condições típicas de uso.

- **Testes de Estresse (Stress Testing)**: Identificar o ponto de ruptura da API, ou seja, a carga máxima que a API pode suportar antes de começar a falhar. Este teste ajuda a entender o comportamento da API sob condições extremas.

- **Testes de Soak (Soak Testing)**: Avaliar o desempenho da API quando ela é submetida a uma carga média por um período prolongado. O objetivo é identificar problemas de memória ou vazamentos que podem ocorrer ao longo do tempo.

- **Testes de Spike (Spike Testing)**: Verificar como a API reage a um aumento súbito e inesperado de carga. Esse teste é útil para garantir que a API possa lidar com picos de tráfego sem falhar.

- **Testes de Fumaça (Smoke Testing)**: Realizar uma verificação inicial para assegurar que os principais recursos da API estão funcionando corretamente. Esse teste é feito para garantir que a API está estável o suficiente para testes mais profundos.

## **User Stories** 📖

Os testes estão diretamente vinculados às **user stories** fornecidas, garantindo que todos os requisitos e funcionalidades descritos nas histórias de usuário sejam validados.

→ [História do Usuário - /movies](challengeDocs/userStories/Movies.md)  
→ [História do Usuário - /tickets](challengeDocs/userStories/Tickets.md)

## **Pessoas Envolvidas** 👥

- **Eduarda Lazzaretti da Silva**: Responsável pelo planejamento e execução dos testes.

## **Local dos Testes** 🌍

- **Remotamente**: Os testes serão conduzidos em um ambiente remoto, com acesso à infraestrutura necessária.

## **Recursos Necessários** 🛠️

- **Swagger da API Cinema**: Para consulta à documentação e definição dos endpoints.
- **Jira**: Para gerenciamento de tarefas e rastreamento de bugs.
- **Computador com Acesso à Internet**: Para acessar as ferramentas e executar os testes.
- **NodeJS**: Ambiente de execução necessário para scripts de teste e dependências.
- **VSCode**: Editor de código para desenvolvimento e manutenção dos scripts de teste.
- **EC2**: Instância para execução dos testes.
- **GitHub**: Repositório para baixar a API e gerenciar versões.
- **K6**: Ferramenta para testes de carga e desempenho.
- **K6 Dashboard**: Para visualização e análise dos resultados dos testes.

---

## **Planejamento Funcional** 📈

→ [Planejamento Funcional](challengeDocs/planoTestes/planejamentoFuncional.md)

## **Planejamento Não Funcional** 📊

→ [Planejamento Não Funcional](challengeDocs/planoTestes/planejamentoNaoFuncional.md)

### **Matriz de Rastreabilidade** 🔍

→ [Matriz de Rastreabilidade](challengeDocs/matrizRastreabilidade.md)

#### **Mapa Mental** 🧠

→ [Arquivo xmind](https://github.com/eduardaldasilva/challengeFinal/blob/main/Assets/API%20Cinema.xmind)

![Mapa Mental](Assets/mapaMental.png)


