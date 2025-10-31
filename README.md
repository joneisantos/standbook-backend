# StandBook Backend

Backend da aplicação StandBook para gerenciamento de agendamentos.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB instalado e rodando localmente
- npm ou yarn

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone <url-do-repositório>
cd standbook-backend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
MONGODB_URI=mongodb://localhost:27017/standbook
PORT=3000
```

## Executando o Projeto

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

2. O servidor estará rodando em `http://localhost:3000`

## Endpoints Disponíveis

### Agendamentos
- POST `/book/register` - Criar novo agendamento
  - Body da requisição:
    ```json
    {
      "employeeId": "string",
      "datetime": "2023-12-31T10:00:00Z",
      "userId": "string",
      "services": [
        {
          "nameService": "string",
          "priceService": number
        }
      ],
      "description": "string",
      "status": "string"
    }
    ```

## Estrutura do Projeto

```
standbook-backend/
├── src/
│   ├── controllers/
│   ├── models/
│   └── ...
├── package.json
└── README.md
```

## Tecnologias Utilizadas

- Express.js
- TypeScript
- MongoDB/Mongoose
- Node.js

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o projeto TypeScript
- `npm start` - Inicia o servidor em modo produção
