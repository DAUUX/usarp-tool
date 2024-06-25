#!/bin/bash

# Carregar variáveis de ambiente do arquivo .env
if [ -f .env ]; then
    source .env
else
    echo "Arquivo .env não encontrado!"
    exit 1
fi

# Configurações do usuário do Git
#git config --global user.name "usarpback"
#git config --global user.email "usarpback@gmail.com"

# Clonar o repositório do frontend usando o token para autenticação
echo "Clonando o repositório do frontend..."
git clone -b develop "https://${GIT_TOKEN}@${FRONTEND_REPO:8}" frontend

# Clonar o repositório do backend usando o token para autenticação
echo "Clonando o repositório do backend..."
git clone -b main "https://${GIT_TOKEN}@${BACKEND_REPO:8}" backend

echo "Repositórios clonados com sucesso!"
