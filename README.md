## Access Token:

- **Pra que serve?**

  - Pegar qualquer tipo de informação do usuário
  - Atualizar qualquer tipo de informação do usuário
  - Inserir qualquer tipo de informação do usuário
  - Deletar qualquer tipo de informação do usuário

- **Duração**

  - Dura pouco tempo(o minímo possível)

- **Risco se ele vazar**

  - Quanto maior o tempo de vida dele, maior o estrago que quem tiver o token pode fazer

## Refresh Token:

- **Pra que serve?**

  - Literalmente, para não precisar pedir a senha e o usuário para gerar um novo access token

- **Duração**

  - Duração é longa
  - O refresh a nível de backend está associado ao usuário de alguma forma

- **Risco se ele vazar**

  - O usuário novo pode gerar tokens INFINITOS(access token, refresh token)
  - Precisa ter alguma forma de invalidar os refresh tokens
