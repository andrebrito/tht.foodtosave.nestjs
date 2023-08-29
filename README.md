![alt](https://media.licdn.com/dms/image/D4D0BAQE-20xYpkezdQ/company-logo_200_200/0/1680814196185?e=1701302400&v=beta&t=JnMSXPlmCZK8Gp1llg9iG5Fk_fOp5DYNKnTSWTItLjI "")

## Take Home Test

### Requisito Opcional
- Colocar um readme para explicar como subir o serviço. :white_check_mark:
- **Repetir a montagem do serviço, seguindo os mesmos critérios, substituindo a linguagem Java por outra de sua escolha.**

### Detalhes para execução
- Há 2 arquivos `docker-compose`:
    - O arquivo com sufixo `-dev` é usado para desenvolvimento, ou seja, executa-se ele e, posteriormente, o `yarn dev` dentro da pasta api, via terminal.
    - O arquivo sem sufixo será usado após o build da imagem da aplicação via Dockerfile.
    - Ambos os arquivos contém a inicialização do Postgres e do Redis.
- `Dockerfile` será usado para o build da imagem via linha de comando:
    - Na raiz do projeto, executar `docker build -t foodtosave-nestjs .`.
    - Executar o `docker-compose.yml` (pela IDE ou pela linha de comando):
      - `docker-compose up`

### Aplicação
- A aplicação foi desenvolvida usando a seguinte stack:
  - NestJS (framework executado usando o NodeJS).
  - Prisma (ORM).
  - Os moldes da aplicação seguem o mesmo do desenvolvido em Java:
    > - Há um modelo, `person`, com 3 colunas: `id`, `name` e `created_at`.
    > - Há um endpoint implementado, com os seguintes métodos HTTP:
    >    - `POST /person`, onde um JSON com o atributo `name` deve ser enviado com algum conteúdo texto.
    >    - `GET /person`, pelo qual será retornada lista com todos os registros persistidos (ou uma lista vazia).
    >    - `GET /person/:id`, endpoint para consultar um registro pelo id.
    >    - `DELETE /person`, para remover todas os regitros.
    >    - `DELETE /person/:id`, para remover registro específico.
    > - Os endpoints de acesso (`GET`) fazem a leitura do(s) registro(s) do banco de dados.
    > - Caso seja feita a mesma requisição antes dos 10 segundos seguintes, a consulta acontece no Redis.
    > - Caso sejam realizadas requisições que alteram o modelo (`POST` ou `DELETE`), há o cache evict no Redis e as próximas consultas serão realizadas no Postgres.

### Testes Automatizados
- Para execução dos testes, foram utilizados:
    - Jest.
    - Supertest.
- Foram implementados diferentes tipos de testes:
    - Para o Service e o Controller, o teste é unitário.
    - Teste de integração.

### Redis Cache
- Foi utilizado Redis como estratégia de cache, usufruindo algumas estratégias já implementadas no NestJS (`CacheModule`).
- O controle de acesso e configuração dos registros no Redis acontece de forma programática (ou seja, é toda manual).
  - O ponto positivo dessa abordagem é que conseguimos realizar testes unitários validando que o serviço do Redis foi invocado.

### Conclusão
- Implementando as tecnologias mencionadas acima, de 3 a 4 horas foram suficientes.
- Diferente da implementação usando Java, é uma quantidade menor de horas por se tratar da ferramenta que uso no dia a dia.
- Mesmo usando uma ferramenta que estou ambientado, há um pequeno problema 🚫 ao executar os containers pelo compose:
  - A aplicação sobe antes do Postgres, não executando a migration.
  - Mesmo tendo dado o prazo, sigo estudando uma forma de previnir que isso acontece.
- Da mesma forma como no outro repositório, entendo perfeitamente se minha candidatura for declinada, dado que não conclui o desafio.
