# Docker Environment for QA

Este repositório contém um ambiente Docker para testes de qualidade (QA) do projeto USARP Tool. O ambiente é configurado para permitir que os testes sejam realizados de forma consistente e fácil.

## Pré-requisitos

- Docker instalado
- Git instalado

## Configuração

1. Clone este repositório usando o comando:
   ```
   git clone -b docker-test-environment https://github.com/DAUUX/usarp-tool.git docker-test
   ```

2. Acesse a pasta `docker-test`:
   ```
   cd docker-test
   ```

3. Copie os valores das variáveis de ambiente fornecidos pela equipe de desenvolvimento.

   **Para Linux:**

   Execute o script `git_clone_and_config.sh` no terminal:
   ```
   ./git_clone_and_config.sh
   ```

   **Para Windows:**

   Você pode executar o script com o Git Bash.

## Execução

Após configurar as variáveis de ambiente, você pode iniciar o ambiente de teste.

1. O script de configuração clonará os repositórios do frontend e backend automaticamente.

2. Para iniciar o ambiente Docker, execute o seguinte comando:
   ```
   docker-compose up -d
   ```

   Isso iniciará os contêineres Docker necessários.

## Acesso ao Deployment Temporário

Uma vez que os contêineres estejam em execução, você poderá acessar uma versão temporária do deployment.

1. Abra o navegador e acesse `localhost:4040`.

2. Isso abrirá a página do ngrok, que contém a URL para acesso externo ao ambiente de teste.

## Notas

- Certifique-se de que todas as dependências necessárias estejam instaladas e as variáveis de ambiente estejam configuradas corretamente antes de iniciar o ambiente Docker.
- O deployment temporário pode ser acessado somente enquanto os contêineres estiverem em execução. Certifique-se de desligar os contêineres quando não estiverem em uso para economizar recursos.