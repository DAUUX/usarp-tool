# Docker Environment for QA

Este repositório contém um ambiente Docker para testes de qualidade (QA) do projeto **USARP Tool**. O ambiente é configurado para permitir que os testes sejam realizados de forma consistente e prática.

## ✅ Pré-requisitos

* Docker instalado
* Git instalado

## ⚙️ Configuração

1. Clone este repositório usando o comando:

   ```bash
   git clone -b docker-test-environment https://github.com/DAUUX/usarp-tool.git docker-test
   ```

2. Acesse a pasta `docker-test`:

   ```bash
   cd docker-test
   ```

3. Copie os valores das variáveis do arquivo `.env` fornecido pela equipe de desenvolvimento.

   **Para Linux:**

   Execute o script `git_clone_and_config.sh` no terminal:

   ```bash
   ./git_clone_and_config.sh
   ```

   **Para Windows:**

   Clique duas vezes no arquivo. Uma janela será aberta pedindo permissão para executá-lo.
   Você também pode executar o script com o **Git Bash**.

## ▶️ Execução

Após configurar as variáveis de ambiente `.env` e clonar os repositórios com o script `git_clone_and_config.sh`, siga os passos abaixo:

1. No diretório `docker-test`, devem existir duas pastas: `frontend` e `backend`.

2. Acesse a pasta `frontend`, localize o arquivo `.env.production` e cole o seguinte conteúdo:

   ```
   PORT=3000
   PREVIEW_PORT=3000
   ORIGIN=http://localhost:3000
   BASE_URL=http://localhost:3333
   ```

3. No window o backend, houve um problema com pacote `bcrypt`, nesse caso e apenas fazer substituição.
     - na pasta do backend altere o arquivo package.json 
       ```
       "bcrypt": "5.1.1", trocar por "bcryptjs": "^3.0.2",
       ```
     - O arquivo backend\src\controllers\user.controller.js
       ```
       const bcrypt = require("bcrypt"); trocar por const bcrypt = require("bcryptjs");
       ```
     - O arquivo backend\src\models\user.model.js
       ```
       const bcrypt = require("bcrypt"); trocar por const bcrypt = require("bcryptjs");
       ```
4. Para iniciar o ambiente Docker, execute o seguinte comando:

   ```bash
   docker-compose up -d
   ```


   Isso iniciará os contêineres Docker necessários.

## 🌐 Acesso ao Deployment Temporário

Com os contêineres em execução, você poderá acessar a versão temporária do deployment:

1. Abra o navegador e acesse:
   [http://localhost:3000](http://localhost:3000)

## 📝 Notas

* Certifique-se de que todas as dependências necessárias estejam instaladas e que as variáveis de ambiente estejam corretamente configuradas antes de iniciar o ambiente Docker.
* O deployment temporário estará disponível enquanto os contêineres estiverem ativos. Lembre-se de encerrá-los quando não estiverem em uso para economizar recursos, se necessário.